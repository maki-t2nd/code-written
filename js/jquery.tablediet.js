/*
  スマホ用に横に長いテーブルを１列毎に表示、プルダウンで操作するようにする
  LastUpdate: 2013/04/26
*/
(function($){
  $.fn.tableDiet = function(opt){
    var opt = $.extend({
      selectClass: 'titleSelect'
    },opt);
    this.each(function(){
      var _table = $(this);
      var _trs = _table.find('tr');
      var _titles = [];
      var _select;

      var devSelect = function(titles){
        _select = $('<select />').addClass(opt.selectClass);
        for(var i=0;i<titles.length;i++){
          _select.append($('<option />').text(titles[i]));
        }
      }

      _trs.each(function(i){
        var _tr = $(this);
        if(!i) {
          _tr.find('th:not(:first)').each(function(){
            _titles.push($(this).text());
          });
        }
        
        _tr.find(':not(:first)').hide();
      });

      devSelect(_titles);
      _table.before(_select);

      _select.on('change',function(e){
        var index = e.target.selectedIndex +1;
        _trs.each(function(){
          var _tr = $(this);
          _tr.find(':not(:first)').hide();
          _tr.children().eq(index).show();
        });
      });

      _select.trigger('change');

      return this;
    });
  }
})(jQuery);