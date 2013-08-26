/*
  シンプルにフェードするだけのプラグイン
  LastUpdate: 2013/06/25

  html:
  <div id="imageArea">
    <ul class="canvas">
      <li><img src="image/to/path/image1.jpg" alt="image1"></li>
      <li><img src="image/to/path/image2.jpg" alt="image2"></li>
      <li><img src="image/to/path/image3.jpg" alt="image3"></li>
    </ul>
  </div>

  js:
  $('#imageArea').simpleFade();

*/
(function($){
  $.fn.simpleFade = function(opt){
    var opt = $.extend({
      interval: 5000,
      speed: 2000,
      canvas: "canvas",
      current: "cur"
    },opt);
    this.each(function(){
      var _this = $(this);
      var _canvas = $('.' + opt.canvas);
      var _images = _canvas.find('li');
      var timer;

      var len = _images.length;
      for(var i=0;i<len;i++){
        $(_images[i]).css({
          zIndex: (len - i) * 10
        });
      }

      _images.css({opacity:0});
      _images.eq(0).addClass(opt.current).css({opacity:1});

      timer = setInterval(function(){
        var _cur = $('.'+opt.current);
        var _next = (_cur.next()[0]) ? _cur.next() : _images.eq(0);
        var cur_anime = _cur.animate({opacity:0},opt.speed);
        var nex_anime = _next.animate({opacity:1},opt.speed);
        $.when(cur_anime, nex_anime).done(function(){
          _cur.removeClass(opt.current);
          _next.addClass(opt.current);
        });
                
      },opt.interval);
      

      return this;
    });
  }
})(jQuery);