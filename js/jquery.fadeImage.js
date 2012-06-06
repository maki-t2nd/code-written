/*

lastupdate:2012-06-06

*/

//<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

(function($){
	$.fn.fadeImage = function(opt) {
		
		var opt = $.extend({
			interval : 5000,
			fadeSpeed: 1000,
			canvas   : 'canvas',
			control  : 'control',
			caption  : 'caption',
			capDisp  : true,
			amount   : 'amount',
			amtDisp  : true,
			current  : 'cur',
			cross    : true
		}, opt);
		
		this.each(function() {
			var timer;
			var $this    = $(this);
			var $canvas  = $this.find('.'+opt.canvas);
			var $control = $this.find('.'+opt.control);
			var $caption = $this.find('.'+opt.caption);
			var $amount  = $this.find('.'+opt.amount);
			var $btnPrev = $control.find('.prev');
			var $btnNext = $control.find('.next');
			var _len     = $canvas.find('li').size();
			var length   = _len - 1;
			var dataObj  = {'all':(_len > 9) ? _len : '0'+_len};
			var tpl      = $amount.html();
			
			function fadeImage(flag){
				var flag = flag || false;
				var $next;
				var $nextCap;
				var curIndex = $canvas.find('li').index($canvas.find('.'+opt.current));
				var curCapIndex = $caption.find('li').index($caption.find('.'+opt.current));
				var nextIndex;
				
				if(flag){
					$next = (curIndex != 0) ? $canvas.find('.'+opt.current).prev() : $canvas.find('li:last');
					if(opt.capDisp) $nextCap = (curCapIndex != 0) ? $caption.find('.'+opt.current).prev() : $caption.find('li:last');
				}else{
					$next = (curIndex != length) ? $canvas.find('.'+opt.current).next() : $canvas.find('li:first');
					if(opt.capDisp) $nextCap = (curCapIndex != length) ? $caption.find('.'+opt.current).next() : $caption.find('li:first');
				}
				
				nextIndex = $canvas.find('li').index($next) + 1;
				dataObj.to = (nextIndex > 9) ? nextIndex : '0' + nextIndex;
							
				if(opt.cross){
					$canvas.find('.'+opt.current).not(':animated').animate(
						{opacity:'0'},
						{duration:opt.fadeSpeed,queue:false}
					);
					
					if(opt.capDisp){
						$caption.find('.'+opt.current).not(':animated').animate(
							{opacity:'0'},
							{duration:opt.fadeSpeed,queue:false}
						);
					}
					
					nextFade();
					
				}else{
					$canvas.find('.'+opt.current).css({opacity:0});
					if(opt.capDisp) $caption.find('.'+opt.current).css({opacity:0});
					
					nextFade();
				}
				
				function nextFade(){
					$next.not(':animated').animate(
						{opacity:'1'},
						{duration:opt.fadeSpeed,queue:false,complete:
							function(){
								$canvas.find('.'+opt.current).removeClass(opt.current);
								$next.addClass(opt.current);
								if(opt.amtDisp) setTpl();
							}
						}
					);
					
					if(opt.capDisp){
						$nextCap.not(':animated').animate(
							{opacity:'1'},
							{duration:opt.fadeSpeed,queue:false,complete:
								function(){
									$caption.find('.'+opt.current).removeClass(opt.current);
									$nextCap.addClass(opt.current);
								}
							}
						);
					}
				}
			
			}
			
			function setTpl(){
				var src = tpl.replace(/{#(\w+)}/g,function(m,key){
					return dataObj[key] || '';
				});
				
				$amount.html(src);
			}
			
			function startFade(){
				timer = setInterval(function(){
					fadeImage();
				},opt.interval);
			}
			
			$canvas.find('li:not(:first)').css({
				opacity:0
			});
			
			$canvas.find('li:first').addClass(opt.current);
			
			if(opt.capDisp){
				$caption.find('li:not(:first)').css({
					opacity:0
				});
				$caption.find('li:first').addClass(opt.current);
			}
			
			if(opt.amtDisp){
				dataObj.to = '01';
				setTpl();
			}
			
			startFade();
			
			$btnPrev.bind('click',function(){
				clearInterval(timer);
				fadeImage(true);
				startFade();
				return false;
			});
			
			$btnNext.bind('click',function(){
				clearInterval(timer);
				fadeImage();
				startFade();
				return false;
			});
			
			$canvas.bind('mouseover',function(){
				clearInterval(timer);
			});
			
			$canvas.bind('mouseout',function(){
				startFade();
			});
			
		});
		return this;
	};
})(jQuery);