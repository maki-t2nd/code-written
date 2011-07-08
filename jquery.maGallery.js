/*

lastupdate:2011-07-01

*/

(function($){
	$.fn.maGallery = function(opt) {
		
		var opt = $.extend({
			effect      :'fade',
			speed       :5000,
			innnerClass :'galleryBg',
			currentClass:'current',
			hoverClass  :'hover',
			dataAttr    :'data-repImg',
			bgLink      :true,
			thumbLink   :true,
			slideSpeed  :1000,
			repSpeed    :1000,
			delay       :true,
			easing      :'linear'
		}, opt);
		
		var $canvas;
		var $current;
 
		var repImg;
		var timer;
        var defSize = 0;
        var defMgn = 0;
        var clone;
        var clone2;
        var ulWidth = 0;
        var liWidth = 0;
        var liHarf = 0;
        var galleryHeight;
        var times;
        var cache = [];
         
         
		function alterIndex($this){
			$('li',$this).each(function(i){
				$(this).data('i',i);
			});
		}

		function anchorSet(){
			$canvas.unbind('click');
			var href;
			var $anchor = $current.find('a');
			href = $anchor.attr('href');
			if(!(href == '#' || href == '' || href == undefined)){
				$canvas.css({cursor:'pointer'}).bind('click',function(){
					if(!!$anchor.attr('target')){
						var target= $anchor.attr('target');
							switch(target){
								case '_blank':
									window.open(href);
									break;
								default:
								location.href = href;
							}
					}else{
						location.href = href;
					}
				});
			}else{
				$canvas.css({cursor:'default'}).unbind('click');
			}
		}
         
		function repImage(){
			if(opt.bgLink){
				anchorSet();
			}
			switch(opt.effect){
				case 'fade':
					$('.galleryCurrent',$canvas).css({opacity:'0.1',backgroundImage:'url('+repImg+')'})
					.animate({opacity:'1'},{duration:opt.repSpeed});
				break;
				case 'cross':
					$('<div class="inner galleryNext" />').appendTo($canvas)
						.css({
							position:'absolute',
							top:'0',
							left:'0',
							width:'100%',
							height:galleryHeight,
							backgroundImage:"url("+repImg+")",
							backgroundPosition:'center top',
							backgroundRepeat:'no-repeat',
							opacity:'0'
						})
						.not(':animated').animate(
							{opacity:'1'},
							{duration:opt.repSpeed,queue:false}
						);
					$(' .galleryCurrent',$canvas).not(':animated').animate(
						{opacity:'0'},
						{duration:opt.repSpeed,queue:false,complete:
							function(){
								$(' .galleryCurrent',$canvas).remove();
								$(' .galleryNext',$canvas).addClass('galleryCurrent').removeClass('galleryNext');
							}
						}
					);
				break;
			}
		}
         
		function thumbMove($this,$target,times){
			var isPN;
			if(times > 0){
				isPN = true;
			}else if (times < 0){
				isPN = false;
			}else{
				return false;
			}
             
			var moveWidth = liWidth * times;
			moveWidth = moveWidth+'px';
             
			repImg =$('img',$target).attr(opt.dataAttr);
             
			$('ul',$this).not(':animated')
				.animate(
					{marginLeft:'+='+moveWidth},
					{
						duration:opt.slideSpeed,
						easing:opt.easing,
						complete:function(){
							$('ul',$this).css({marginLeft:'-'+defMgn+'px'});
							for(var i=1;i<=Math.abs(times);i++){
								if(isPN){
									$('ul',$this).prepend($('ul li:last',$this));
								}else{
									$('ul',$this).append($('ul li:first',$this));
								}
							}
							alterIndex($this);
							$current.removeClass(opt.currentClass);
							$target.addClass(opt.currentClass);
							$current = $target;
                             
							if(opt.delay){
								repImage();
							}
						},
						queue:false
					}
				);
                 
				if(!opt.delay){
					repImage();
				}
		}
         
		this.each(function() {
			var $this = $(this);
             
			$('li img',$this).each(function(i){
				var cacheImage = new Image();
				cacheImage.src = $(this).attr(opt.dataAttr);
				cache.push(cacheImage);
			});
            
			$this.css({position:'relative'});
			$this.prepend('<div class="'+opt.innnerClass+'" />');
			$canvas = $('.'+opt.innnerClass,$this);
			defSize = $('li',$this).size();
			clone = $('li',$this).clone();
			clone2 =  $('li',$this).clone();
			$('ul',$this).append(clone);
			$('ul',$this).prepend(clone2);
			$('ul li',$this).eq(defSize).addClass(opt.currentClass);
			$current = $('.'+opt.currentClass,$this);
			repImg = $('ul .'+opt.currentClass+' img',$this).attr(opt.dataAttr);
             
			$('li',$this).each(function(i){
				var $li = $(this);
				var wid = parseInt($li.width());
				var ml  = parseInt($li.css('marginLeft'));
				var mr  = parseInt($li.css('marginRight'));
				var pl  = parseInt($li.css('paddingLeft'));
				var pr  = parseInt($li.css('paddingRight'));
				var blw = !isNaN(parseInt($li.css('borderLeftWidth'))) ? parseInt($li.css('borderLeftWidth')) : 0 ;
				var brw = !isNaN(parseInt($li.css('border-right-width'))) ? parseInt($li.css('border-right-width')) : 0 ;
				var cLi = 0;
                 
				ulWidth += wid+ml+mr+pl+pr+blw+brw+1;
				cLi = wid+ml+mr+pl+pr+blw+brw;
				if(cLi > liWidth){
					liWidth = cLi;
				}
			});
             
			alterIndex($this);
             
			liHarf = Math.floor(liWidth / 2);
             
			var parentHarf = Math.floor(($('ul',$this).parent().width() + parseInt($('ul',$this).parent().css('paddingLeft')) + parseInt($('ul',$this).parent().css('paddingRight'))) / 2);
             
			defMgn = (liWidth*defSize)-(parentHarf)+liHarf;
             
			$('ul',$this).css(
				{
					marginLeft:'-'+defMgn+'px',
					width:ulWidth+'px'
				}
			);
             
			galleryHeight = ($this.height()+parseInt($this.css('paddingTop'))+parseInt($this.css('paddingBottom')))+'px';
             
			$canvas.css({
				position:'absolute',
				top:'0',
				left:'0',
				width:'100%',
				height:galleryHeight
			});
             
			$canvas.append('<div class="inner galleryCurrent" />');
			$('.inner',$canvas).css({
				position:'absolute',
				top:'0',
				left:'0',
				width:'100%',
				height:galleryHeight,
				backgroundImage:"url("+repImg+")",
				backgroundPosition:'center top',
				backgroundRepeat:'no-repeat'
			});
             
			$btnL = $('#btnL',$this);
			$btnR = $('#btnR',$this);
             
			$('ul li',$this).hover(function(){
				$(this).addClass(opt.hoverClass);
			},
			function(){
				$(this).removeClass(opt.hoverClass);
			});
             
			$btnL.bind('click',function(e){
			clearInterval(timer);
				thumbMove($this,$current.next(),-1);
				timer = setInterval(function(){thumbMove($this,$current.next(),-1);},opt.speed);
				e.preventDefault();
			});
			$btnR.bind('click',function(e){
				clearInterval(timer);
				thumbMove($this,$current.prev(),1);
				timer = setInterval(function(){thumbMove($this,$current.next(),-1);},opt.speed);
				e.preventDefault();
			});
             
			if(opt.bgLink){
				anchorSet();
            }
             
			if(!opt.thumbLink){             
				$('li',$this).bind('click',function(e){
					var $target = $(this);
					times = $current.data('i') - $target.data('i');
					clearInterval(timer);
					thumbMove($this,$target,times);
					timer = setInterval(function(){thumbMove($this,$current.next(),-1);},opt.speed);
					e.preventDefault();
				});
			}
             
			timer = setInterval(function(){
				thumbMove($this,$current.next(),-1);
			},opt.speed);
             
		});

		return this;
	};
})(jQuery);