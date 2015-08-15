ACMS.Ready(function(){
(function($){

var styles = '';
var cssPath = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
var _target;

function getCss(){
  if(styles == '') {
    $.get(cssPath).done(function(css){
      var re = /(\.fa\-\w*?\-\w*?)\:/g;
      styles = css.match(re);
      openDialog();
    });
  } else {
    openDialog();
  }
}

function buildHtml(){
  var tpl = '<li style="display:inline-block;padding:0 20px 10px 0;"><a href="#" class="js-addIcon"><i class="fa {#class}"></i> .{#class}</a></li>';
  var html = '<ul style="list-style:none;padding:0;">';

  for(var i=0; i<styles.length; i++) {
    var cls = styles[i].replace(/\.|:/g, '');
    html += tpl.replace(/\{#class\}/g, cls);
  }

  html += '</ul>';
  return html;
}

function openDialog() {
  var html = buildHtml();
  var tpl = '<div id="iconDialog" title="アイコン選択"></div>';

  $('body').append(tpl);
  $('#iconDialog').html(html);
  $( "#iconDialog" ).dialog({
    width: 500
  });
}

function iconAdd(elem) {
  var tpl = '<i class="{#class}"></i>'
  var cls = elem.find('i').attr('class');
  var html = tpl.replace(/\{#class\}/, cls);

  var txt = _target.val();
  var pos = _target.get(0).selectionStart;
  var apos = pos + html.length;
  
  _target.focus();
  _target.val(txt.substr(0, pos) + html + txt.substr(pos));
  _target.get(0).setSelectionRange(apos, apos);

  $(".ui-dialog-content").dialog("close");
}


$(document).on('click', '.js-iconOpen', function(e){
  e.preventDefault();
  _target = $(this).parents('.entryFormColumnItem').find('.entryFormTextarea');
  getCss();
});

$(document).on('click', '.js-addIcon', function(e){
  e.preventDefault();
  var _this = $(this);
  iconAdd(_this);
});

})(jQuery);
});