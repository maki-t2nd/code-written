/*

lastupdate:2012-02-22

*/

//<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

(function($){
	$.fn.fadeImage = function(opt) {
		
		var opt = $.extend({
			interval : 5000,
			fadeSpeed: 1000,
			canvas   : 'canvas',
			current  : 'cur',
			cross    : true
		}, opt);
		
		this.each(function() {
			var timer;
			var $this    = $(this);
			var $canvas  = $this.find('.'+opt.canvas);
			var length   = $canvas.find('li').size()-1;
			
			function fadeImage(){
				var $next = ($canvas.find('li').index($canvas.find('.'+opt.current)) != length) ? $canvas.find('.'+opt.current).next() : $canvas.find('li:first');
				if(opt.cross){
					$canvas.find('.'+opt.current).not(':animated').animate(
						{opacity:'0'},
						{duration:opt.fadeSpeed,queue:false}
					);
					$next.not(':animated').animate(
						{opacity:'1'},
						{duration:opt.fadeSpeed,queue:false,complete:
							function(){
								$canvas.find('.'+opt.current).removeClass(opt.current);
								$next.addClass(opt.current);
							}
						}
					);
				}else{
					$canvas.find('.'+opt.current).css({opacity:0});
					$next.not(':animated').animate(
						{opacity:'1'},
						{duration:opt.fadeSpeed,queue:false,complete:
							function(){
								$canvas.find('.'+opt.current).removeClass(opt.current);
								$next.addClass(opt.current);
							}
						}
					);
				}
			}
			
			$canvas.find('li:not(:first)').css({
				opacity:0
			});
			
			$canvas.find('li:first').addClass(opt.current);
			
			timer = setInterval(function(){
				fadeImage();
			},opt.interval);
			
		});
		return this;
	};
})(jQuery);