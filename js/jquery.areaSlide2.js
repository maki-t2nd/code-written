/*

lastupdate:2012-10-03

*/

//<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

(function($){
	$.fn.areaSlide2 = function(opt) {
		
		var opt = $.extend({
			speed      : 1000,
			aSpeed     : 5000,
			easing     : 'easeOutBounce',
			slider     : '.slider',
			block      : '.block',
			control    : '.control',
			prev       : '.prev',
			next       : '.next',
			hoverClass : 'hover',
			animation  : true,
			vertical   : false,
			minSize    : null
		}, opt);
		
		this.each(function() {
			var $this    = $(this);
			var $slider  = $(opt.slider,$this);
			var $block   = $(opt.block,$this);
			var $hover   = $('.'+opt.hoverClass,$this);
			var $control = $(opt.control,$this);
			var $prev    = $(opt.prev,$this);
			var $next    = $(opt.next,$this);
			var len      = $block.size();
			var current  = 0;
			var defRange;
			var timer;
			var slidSize;
			var blkSize;
			
			var $copyF = $block.clone();
			var $copyR = $block.clone();
			
			$slider.append($copyF);
			$slider.prepend($copyR);
			
			if(opt.vertical){
				margin = 'marginTop';
				defRange = parseInt($block.eq(0).outerHeight(true));
				$slider.css({
					marginTop:'-'+defRange*len+'px'
				});
			}else{
				margin = 'marginLeft';
				defRange = parseInt($block.eq(0).outerWidth(true));
				$slider.css({
					marginLeft:'-'+defRange*len+'px'
				});
			}
			
			if(opt.minSize != null){
				if(opt.minSize > len){
					opt.animation = false;
					$control.remove();
				}
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
									$slider.prepend($(opt.block+':last',$this));
								}
								$slider.css({marginLeft:'-'+defRange*len+'px'});
							}
						}
					);
				}
				
			}
			
			function autoSlide(flag){
				timer = setInterval(function(){
					slide(flag);
				},opt.aSpeed);
			}
			
			$prev.bind('click',function(e){
				clearInterval(timer);
				slide(false);
				if(opt.animation) autoSlide(true);
				e.preventDefault();
			});
		
			$next.bind('click',function(e){
				clearInterval(timer);
				slide(true);
				if(opt.animation) autoSlide(true);
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
				autoSlide(true);
			}
			
		
			
		});
		return this;
	};
})(jQuery);