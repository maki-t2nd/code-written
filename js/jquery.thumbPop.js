/*

lastupdate:2011-12-16

*/

//<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

(function($){
	$.fn.thumbPop = function(opt) {
		
		var opt = $.extend({
			ctrlClass:'control',
			overView:'overView',
			canvasClass:'canvas',
			overX:80,
			overY:80,
			overT:10,
			overL:10,
			popSpeed:100,
			imgRep:true
		}, opt);
		
		
		this.each(function() {
			var $this = $(this);
			var $ctrl = $('.'+opt.ctrlClass,$this);
			var $canvas = $('.'+opt.canvasClass,$this);
			var $li = $('li',$ctrl);
			
			$li.bind('mouseover',function(e){
				$('#'+opt.overView).remove();
				var offsetLeft = e.target.offsetLeft;
				var offsetTop = e.target.offsetTop;
				if(!offsetLeft || !offsetTop){
					offsetLeft = $(this).offset().left;
					offsetTop = $(this).offset().top;
				}
				var $clone = $('img',this).clone();
				var defX = $clone.attr('width');
				var defY = $clone.attr('height');
				var repImg = $clone.attr('src');
				$clone.css({
					position:'absolute',
					top:offsetTop+'px',
					left:offsetLeft+'px',
					cursor:'pointer'
				}).attr('id',opt.overView).data('id',$this.attr('id'));
				$('body').append($clone);
				$('#'+opt.overView).not(':animated').animate(
					{width:opt.overX+'px',
					height:opt.overY+'px',
					left:offsetLeft-opt.overL+'px',
					top:offsetTop-opt.overT+'px'},
					{
						duration:opt.popSpeed
					}
				);
				
				$('#'+opt.overView).bind('mouseout',function(){
															 
					$('#'+opt.overView).stop().animate(
						{
							left:offsetLeft+'px',
							top:offsetTop+'px',
							width:defX+'px',
							height:defY+'px'
						},
						{
							duration:opt.popSpeed,
							complete:function(){
								$(this).remove();
							}
						}
					);
				});
				
				if(opt.imgRep){
					$clone.bind('click',function(){
						var imgElem = document.createElement('img');
						imgElem.src = repImg;
						$canvas.html(imgElem);
					});
				}
			});
			
		});
		return this;
	};
})(jQuery);