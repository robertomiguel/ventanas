// Controlador del menú y ventanas
app.controller("menuCtrl", function ($scope, $http, $compile, menuPrincipal, $interval) {
    $scope.pc_estado = 'resize-full';

    var tiempo = function() {
      $scope.reloj = Date.now();
    }
    tiempo();
    $interval(tiempo, 10000);

    $http({
      		method  : 'post',
         	url 	: 'http://menu.local/menu_principal.php'
    	 }).then(function successCallback(response) {
            menuPrincipal.data = response.data;
            $scope.menuPrincipal = menuPrincipal.data;
           }, function errorCallback(response) {
                  alert('Error al cargar menu: ' + response.data);
    });

    $scope.ventanasAbiertas = []; // JSON de ventanas abiertas

    $scope.mostrarVentana = function(ventanaID){
      var ventana = $('#'+ventanaID );
      if (ventana.hasClass('ventana-sombra')) {minVentana(ventanaID); return;}
      if (ventana.attr('min')=='1') {
          ventana.show();
          //ventana.click();
          if (ventana.attr('max')=='0'|| !ventana.attr('max')) {
                var ancho = ventana.attr('ancho');
                var largo = ventana.attr('largo');
                var horizontal = ventana.attr('horizontal');
                var vertical = ventana.attr('vertical');
          } else {
                var ancho = '100%'; var largo = '100%';
                var horizontal = 0; var vertical = 0;
          }
          ventana.css({width:ancho, height:largo, top:vertical, left:horizontal, opacity: 1, 'z-index': 3 }).one (
            "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
            function(){
              if(ventana.attr('min')=='0') {
                ventana.removeClass('ventana-animacion');
                ventana.click(); // selecciona ventana
              }
          });
          
          ventana.attr('min','0');
      } else {
        ventana.click(); // selecciona ventana
      }
      
    }

    $scope.quitarVentana = function(ventanaID) {
      var i = 0;
       angular.forEach($scope.ventanasAbiertas, function(l) {
            //alert(l.menuID);
            if ( l.ventanaID == ventanaID ) {
              $scope.ventanasAbiertas.splice(i,1);
              $scope.$apply();
              //angular.element(document.getElementById(l.href+'-ctrl')).scope().$destroy();
              $('#'+ventanaID).remove();
              return;
            }
            i++;
        });
      }

    $scope.abrirVentana = function(href, nombre, id, icon) {
        if (href=='+') return; // si es contenedor (+), no crea ventana

// comprobar si esta abierta
        var i = 0;
        var existe = 0;
       angular.forEach($scope.ventanasAbiertas, function(l) {
            if ( l.ventanaID == 'ventana_'+id ) {
              $('#boton-menu-principal').click();
              $('#ventana_'+id).click();
              existe = 1;
            }
            i++;
        });
       if (existe==1) return;
  
        var ventanaID = $('#escritorio').ventana({titulo  : nombre, icon : icon,
                          x : 10, y :  1, id : id,
                          contenido : 'cargando...'
                        });
        $(ventanaID).append('<script src="/app/'+href+'-ctrl.js"></script>');
        $(ventanaID).append('<link rel="stylesheet" type="text/css" href="/app/'+href+'.css">');
          $scope.ventanasAbiertas.push({
            nombre : nombre, ventanaID: 'ventana_'+id, icon: icon, href: href
          });
        
        $http({
                method : 'post',
                url    : '/app/' + href + '.html'
        }).then( function successCallback(response) {

          $(ventanaID).find('.ventana-cuerpo').html($compile(response.data)($scope));
          }, function errorCallback(response) {

          $(ventanaID).find('.ventana-cuerpo').html('Error al cargar ventana: <h2>' + href + '</h2><br />' + response.data);
        
           });

        $('#boton-menu-principal').click(); // cerrar menú principal
    }

    $scope.pantalla_completa = function() {
      if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        $scope.pc_estado = 'resize-small';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        $scope.pc_estado = 'resize-full';
      }
    }

    $scope.verNotificaciones = function() {
      var barra = $('.notificaciones');
        barra.css('right', '0')
        .focus()
        .blur(function(){
          barra.css("right", '-310px');
        });
    }
});