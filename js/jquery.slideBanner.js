/*

lastupdate:2012-03-22

*/

//<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

(function($){
	$.fn.slideBanner = function(opt) {
		
		var opt = $.extend({
			way: false,
			speed: 25000,
			wait: true
		}, opt);
		
		this.each(function() {
			var $this = $(this);
			var $slideArea = $this.find('ul');
			var moveX = 0;
			var defMargin;
			var areaWidth;
			var timer;
			var movedX,movingX;
			$slideArea.find('li').each(function(){
				moveX += parseInt($(this).outerWidth(true));
			});
			
			areaWidth = moveX * 3;
			defMargin = Math.floor(areaWidth / 2);
			
			if(!opt.way) moveX *= -1;
			
			var cloneBf = $this.find('li').clone();
			var cloneAf = $this.find('li').clone();
			
			$slideArea.prepend(cloneBf);
			$slideArea.append(cloneAf);
			
			$slideArea.css({
				width: areaWidth + 'px'
			});
			
			
			bannerSlide();
			
			function bannerSlide(){
				$slideArea.css({
					marginLeft: '-' + defMargin + 'px'
				});
				
				if(opt.speed){
					$slideArea.animate(
						{marginLeft:'+='+moveX+'px'},
						{duration:opt.speed,easing:'linear',queue:false}
					);
					
					timer = setTimeout(function(){
						bannerSlide();
					},opt.speed);
				}
			}
			
			if(opt.wait && opt.speed){
				$slideArea.find('li').live('mouseover',function(){
					$slideArea.stop();
					clearTimeout(timer);
				});
				
				$slideArea.find('li').live('mouseout',function(){
					movedX = parseInt($slideArea.css('marginLeft')) + defMargin; //動いた距離
					movingX = moveX - movedX; //残り距離
					$slideArea.animate(
						{marginLeft:'+='+movingX+'px'},
						{duration:Math.abs(opt.speed / moveX * movingX)　,easing:'linear',complete:function(){bannerSlide();},queue:false}
					);
				});
			}
			
		});
		return this;
	};
})(jQuery);