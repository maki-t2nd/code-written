/*

lastupdate:2011-09-07

*/

(function($){
	$.fn.appleSlide = function(opt) {
		
		var opt = $.extend({
			speed:700,
			interval:5000,
			easing:'easeInCirc',
			txtEasing:'easeInCirc',
			curClass:'current',
			canvasClass:'.canvas',
			controlClass:'.control'
		}, opt);
		
		this.each(function() {
			
			var canvasMove = function(times){
				var plusMag = 300;
				var defMag;
				var slideMag = 0;
				var isPN = times > 0 ? true : false ;
				
				if(isPN){
					plusMag *= -1
				}
				
				defMag = $('.slide-txt',$target).css('marginLeft');
				slideMag = parseInt(defMag) + plusMag;
				console.log(slideMag);
				$('.slide-txt',$target).css({marginLeft:slideMag+'px'});
				
				var moveX = imgX * times;
				
				$canvas.not(':animated')
					.animate(
						{marginLeft:'+='+moveX+'px'},
						{
							duration:opt.speed,
							easing:opt.easing,
							complete:function(){
								
								var spd = parseInt($('.slide-txt',$target).attr('data-delay'));
								if(!spd){
									spd = 200;
								};
								$('.slide-txt',$target).not(':animated').animate(
									{marginLeft:defMag},
									{duration:spd,easing:opt.txtEasing,
									complete:function(){
										imgCur-=times;
										if(imgSize < imgCur){
											$canvas.css({marginLeft:'-'+imgX+'px'});
											imgCur = 1;
										}
										$('li',$this).removeClass(opt.curClass);
										$('li',$canvas).eq(imgCur).addClass(opt.curClass);
										$('li',$control).eq(imgCur-1).addClass(opt.curClass);
									},
									queue:false}
								);
								
							},
							queue:false
						}
					);			
			}
			
			var $this = $(this);
			var $canvas = $(opt.canvasClass,$this);
			var $control = $(opt.controlClass,$this);
			var $target;
			var timer;
			var imgX = $this.prop('offsetWidth');
			var imgSize = $('li',$canvas).size();
			var canvasX = imgX * imgSize + imgX * 2 + 10;
			var imgCur = 1;
			var $firstLi = $('li:first',$canvas).clone();
			var $lastLi = $('li:last',$canvas).clone();
			
			$('li:first',$canvas).addClass(opt.curClass);
			$('li:first',$control).addClass(opt.curClass);
			$canvas.append($firstLi);
			$canvas.prepend($lastLi);
			$canvas.css({
				marginLeft:'-'+imgX+'px',
				width:canvasX+'px'
			});
			
			$('li',$control).bind('click',function(){
				var curIndex = $('li',$control).index($('.'+opt.curClass,$control));
				var targetIndex = $('li',$control).index(this);
				$target = $('li',$canvas).eq(targetIndex + 1);
				times = curIndex - targetIndex;
				clearInterval(timer);
				canvasMove(times);
				timer = setInterval(function(){
					$target =  $('.'+opt.curClass,$canvas).next();
					canvasMove(-1);
				},opt.interval);
			});
			
			timer = setInterval(function(){
				$target =  $('.'+opt.curClass,$canvas).next();
				canvasMove(-1);
			},opt.interval);
			
			
			
		});
		return this;
		
	};
})(jQuery);