﻿/*

lastupdate:2011-09-08

*/

(function($){
	$.fn.appleSlide = function(opt) {
		
		var opt = $.extend({
			speed:700,
			interval:5000,
			easing:'easeInCirc',
			jsEasing:'easeOutExpo',
			cssEasing:'ease-out',
			curClass:'current',
			canvasClass:'.canvas',
			controlClass:'.control',
			txtClass:'.slide-txt',
			delayAttr:'data-delay',
			mode:true
		}, opt);
		
		this.each(function() {
						   
			var alterIndex = function(times){
				imgCur-=times;
				if(imgSize < imgCur){
					$canvas.css({marginLeft:'-'+imgX+'px'});
					imgCur = 1;
				}
				$('li',$this).removeClass(opt.curClass);
				$('li',$canvas).eq(imgCur).addClass(opt.curClass);
				$('li',$control).eq(imgCur-1).addClass(opt.curClass);
			}
			
			var canvasMove = function(times){
				var plusMag = 400;
				var slideMag = 0;
				var $targetAry = new Array();
				
				if(!times){
					times = -1;
				}
				
				var isPN = times > 0 ? true : false ;
				
				if(isPN){
					plusMag *= -1
				}
				
				if(opt.mode){
					$('li:not(.'+opt.curClass+')',$canvas).find(opt.txtClass).each(function(i){
						var $text = $(this);
						slideMag = parseInt($text.data('defMag')) + plusMag;
						$text.css({marginLeft:slideMag+'px'});
						$targetAry[i] = $text;
					});
				}else{
					$('li:not(.'+opt.curClass+')',$canvas).find(opt.txtClass).each(function(i){
						var $text = $(this);
						$text.css({
							'-webkit-transform':'translate('+plusMag+'px,0)',
							'-moz-transform':'translate('+plusMag+'px,0)'
						});
						$targetAry[i] = $text;
					});
				}
				
				var moveX = imgX * times;
				
				$canvas.not(':animated')
					.animate(
						{marginLeft:'+='+moveX+'px'},
						{
							duration:opt.speed,
							easing:opt.easing,
							complete:function(){
								var spd;
								if(opt.mode){
									$.each($targetAry,function(i,$text){
										spd = parseInt($text.attr(opt.delayAttr));
										if(!spd){
											spd = 300;
										};
										$text.not(':animated').animate(
											{marginLeft:$text.data('defMag')},
											{duration:spd,easing:opt.jsEasing,
											queue:false}
										);
									});
									alterIndex(times);
								}else{
									$.each($targetAry,function(i,$text){
										spd = parseInt($text.attr(opt.delayAttr));
										if(!spd){
											spd = 300;
										};
										$text.css({
											'-webkit-transform':'translate(0,0)',
											'-webkit-transition':'-webkit-transform '+spd+'ms '+opt.cssEasing,
											'-moz-transform':'translate(0,0)',
											'-moz-transition':'-moz-transform '+spd+'ms '+opt.cssEasing
										})
									});
									alterIndex(times);
								}
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
			if(opt.mode){
				$(opt.txtClass,$canvas).each(function(){
					var $text = $(this);
					$text.data('defMag',$text.css('marginLeft'));
				});
			}
			$('li',$control).bind('click',function(){
				var times;
				var curIndex = $('li',$control).index($('.'+opt.curClass,$control));
				var targetIndex = $('li',$control).index(this);
				$target = $('li',$canvas).eq(targetIndex + 1);
				times = curIndex - targetIndex;
				if(!times){return false;}
				clearInterval(timer);
				canvasMove(times);
				timer = setInterval(function(){
					$target =  $('.'+opt.curClass,$canvas).next();
					canvasMove();
				},opt.interval);
			});
			
			timer = setInterval(function(){
				$target =  $('.'+opt.curClass,$canvas).next();
				canvasMove();
			},opt.interval);
			
			
			
		});
		return this;
		
	};
})(jQuery);