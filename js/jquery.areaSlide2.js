/*

lastupdate:2011-12-09

*/

//<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

(function($){
	$.fn.areaSlide2 = function(opt) {
		
		var opt = $.extend({
			speed   :1000,
			aSpeed  :5000,
			easing  :'linear',
			slider  :'.slider',
			block   :'.block',
			prev    :'.control .prev',
			next    :'.control .next',
			hoverClass:'hover',
			animation:true,
			vertical:true
		}, opt);
		
		this.each(function() {
			var $this    = $(this);
			var $slider  = $(opt.slider,$this);
			var $block   = $(opt.block,$this);
			var $hover   = $('.'+opt.hoverClass,$this);
			var $prev    = $(opt.prev,$this);
			var $next    = $(opt.next,$this);
			var len      = $block.size();
			var current  = 0;
			var defRange;
			var timer;
			
			var $copyF = $block.clone();
			var $copyR = $block.clone();
			
			$slider.append($copyF);
			$slider.prepend($copyR);
			
			if(opt.vertical){
				margin = 'marginTop';
				defRange = parseInt($block.eq(0).height());
				$slider.css({marginTop:'-'+defRange*len+'px'});
			}else{
				margin = 'marginLeft';
				defRange = parseInt($block.eq(0).width());
				$slider.css({marginLeft:'-'+defRange*len+'px'});
			}
			
			function slide(bool){
				var range;
				if(bool){
					range = defRange * -1;
				}else{
					range = defRange;
				}
				
				if(opt.vertical){
					$slider.not(':animated').animate(
						{marginTop:'+='+range+'px'},
						{
							duration:opt.speed,
							easing:opt.easing,
							complete:function(){
								if(bool){
									$slider.append($(opt.block+':first',$this));
								}else{
									$slider.prepend($(opt.block+':last',$this));
								}
								$slider.css({marginTop:'-'+defRange*len+'px'});
							}
						}
					);
				}else{
					$slider.not(':animated').animate(
						{marginLeft:'+='+range+'px'},
						{
							duration:opt.speed,
							easing:opt.easing,
							complete:function(){
								if(bool){
									$slider.append($(opt.block+':first',$this));
								}else{
									$slider.append($(opt.block+':last',$this));
								}
								$slider.css({marginLeft:'-'+defRange*len+'px'});
							}
						}
					);
				}
				
			}
			
			$prev.bind('click',function(e){
				clearInterval(timer);
				slide(true);
				timer = setInterval(function(){
					slide(true);
				},opt.aSpeed);
				e.preventDefault();
			});
		
			$next.bind('click',function(e){
				clearInterval(timer);
				slide(false);
				timer = setInterval(function(){
					slide(true);
				},opt.aSpeed);
				e.preventDefault();
			});
			
			$block.live('mouseover',function(){
				$(this).addClass(opt.hoverClass);
			}).live('mouseout',function(){
				$(this).removeClass(opt.hoverClass);
			});
			
			$hover.live('click',function(){
				$anchor = $(this).find('a').eq(0);
				var href = $anchor.attr('href');
				var target = $anchor.attr('target');
				switch(target)
				{
					case '_blank':
						window.open(href);
					break;
					default:
						location.href = href;
				}
			});
			
			if(opt.animation){
				timer = setInterval(function(){
					slide(true);
				},opt.aSpeed);
			}
			
		
			
		});
		return this;
	};
})(jQuery);