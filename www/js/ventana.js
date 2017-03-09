(function ( $ ) {

  $.fn.ventana = function(config) {
    var x       = config.x+'px';
    var y       = config.y+'px';
    var titulo  = config.titulo;
    var icon    = 'glyphicon glyphicon-' + ((!config.icon) ? 'leaf' : config.icon);
    var contenido = config.contenido;
    var largo   = (!config.largo) ? 800+'px' : config.largo+'px';
    var alto    = (!config.alto) ? 600+'px' : config.alto+'px';
    var id      = config.id;

    var id = 'ventana_'+id;
    var escritorio = '#'+$(this).attr('id');
    this.append(
                '<div id="'+id+'" class="ventana-app">'
                +'<nav>'
                +   '<table class="ventana-barra ventana-barra-color"><tr ondblclick="maxVentana('+"'"+id+"'"+')">'
                +       '<td class="ventana-icono"><span class="'+icon+'"></span></td>'
                +       '<td align="center"><span class="ventana-titulo">'+titulo+'</span></td>'
                +       '<td align="right" class="ventana-controles">'
                +           '<span class="glyphicon glyphicon-minus"     onclick="minVentana   ('+"'"+id+"'"+')"></span>'
                +           '<span class="glyphicon glyphicon-unchecked" onclick="maxVentana   ('+"'"+id+"'"+')"></span>'
                +           '<span class="glyphicon glyphicon-remove"    onclick="cerrarVentana('+"'"+id+"'"+')"></span></td>'
                +   '</tr></table>'
                +'</nav>'
                +   '<div class="ventana-cuerpo"></div>'
                + '</div>'
                );
    var ventana = $('#'+id);
    ventana.css({left : x,   top : y,  width : largo, height : alto});
    ventana.find('.ventana-cuerpo').html(contenido);
    ventana.draggable({ handle: "nav",  containment: escritorio,
                        opacity: 0.5,   start: function( event, ui ) {
                                                      ventana.removeClass('ventana-animacion');
                                                      $(event.target).click();
                                                    }
    }).click(function(){
      if(ventana.attr('min')=='0'|| !ventana.attr('min')) {
        $(escritorio).find("[id^=ventana_]").removeClass('ventana-sombra').css('z-index','0');
        ventana.addClass('ventana-sombra').css('z-index','2');
      }    
    });

    ventana.resizable({
      start : function(event, ui) {ventana.removeClass('ventana-animacion')}
    });
    ventana.click();
    return '#'+id;
  };

}( jQuery ));

function cerrarVentana(e) {
  var id = $('#'+e).attr('id');
  //$('#'+e).remove();
  angular.element(document.getElementById('menuCtrl')).scope().quitarVentana(id);
  //angular.element(document.getElementById('menuCtrl')).scope().$destroy();
}

function minVentana(e) {
  var ventana = $('#'+e);
  ventana.removeClass('ventana-sombra');
  ventana.addClass('ventana-animacion');
  if (ventana.attr('max')=='0' || !ventana.attr('max')) {
    ventana.attr('ancho',      ventana.css('width'));
    ventana.attr('largo',      ventana.css('height'));
    ventana.attr('horizontal', ventana.css('left'));
    ventana.attr('vertical',   ventana.css('top'));
  }
  ventana.attr('min','1');
  ventana.css({
    top:0, left:0, width:0, height:0, opacity: 0
  }).one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
    if(ventana.attr('min')=='1') {
      ventana.removeClass('ventana-sombra');
      ventana.hide();
    }
  });
}

function maxVentana(e) {
  var ventana = $('#'+e); //$(e).parent().parent().parent().parent();
  ventana.addClass('ventana-animacion');
  if (ventana.attr('max')=='1') {
    var ancho = ventana.attr('ancho');
    var largo = ventana.attr('largo');
    var horizontal = ventana.attr('horizontal');
    var vertical = ventana.attr('vertical');
    ventana.css({width:ancho, height:largo, top:vertical, left:horizontal});
    ventana.attr('max','0');
  } else {
    ventana.attr('ancho', ventana.css('width'));
    ventana.attr('largo', ventana.css('height'));
    ventana.attr('horizontal',  ventana.css('left'));
    ventana.attr('vertical',  ventana.css('top'));
    ventana.css({width:'100%', height:'100%', top:0, left:0});
    ventana.attr('max','1');
  }
}