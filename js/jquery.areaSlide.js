/*

lastupdate:2012-06-06

*/

(function($){
	$.fn.areaSlide = function(opt) {
		
		var opt = $.extend({
			speed   :1000,
			easing  :'linear',
			slider  :'.slider',
			block   :'.block',
			prev    :'.control .prev',
			next    :'.control .next',
			disabled:'disabled'
		}, opt);
		
		this.each(function() {
			var $this    = $(this);
			var $slider  = $(opt.slider,$this);
			var $block   = $(opt.block,$this);
			var $prev    = $(opt.prev,$this);
			var $next    = $(opt.next,$this);
			var len      = $block.size() - 1;
			var defRange = $block.eq(0).width();
			var current  = 0;
			
			function slide(bool){
				var range;
				if(bool){
					var range = defRange * -1;
				}else{
					var range = defRange;
				}
				$slider.not(':animated').animate(
					{marginLeft:'+='+range+'px'},
					{
						duration:opt.speed,
						easing:opt.easing
					}
				);
			}
			
			function addEvent(){
				$prev.removeClass(opt.disabled).unbind('click');
				$next.removeClass(opt.disabled).unbind('click');
				if(current){
					$prev.bind('click',function(e){
						if($(':animated').size()) return false;
						slide(false);
						current--;
						addEvent();
						e.preventDefault();
					});
				}else{
					$prev.addClass(opt.disabled)
					.bind('click',function(e){
						e.preventDefault();
					});
				}
				
				if(current != len){
					$next.bind('click',function(e){
						if($(':animated').size()) return false;
						slide(true);
						current++;
						addEvent();
						e.preventDefault();
					});
				}else{
					$next.addClass(opt.disabled)
					.bind('click',function(e){
						e.preventDefault();
					});
				}
			}
			
			addEvent();
			
		
			
		});
		return this;
	};
})(jQuery);