/*$(document).ready(function() { });*/
/*$( function() { });*/
window.app = angular.module('app',[]);

// servicio para compartir el json del menu principal
app.service('menuPrincipal',function(){
    this.data = {
        message : "carga el json"
    }
})

// filtro para cargar submenu de cada contenedor
app.filter('filtroSubmenu', function() { // Selecciona los menu hijos de un determinado padre
    return function(input, padre) {
          var salida = [];
          angular.forEach(input, function(l) {
              if (l.padre == padre) {
                salida.push(l);
              }
          })
          return salida;
    }
});

// --- Filtro mismo empleador
app.filter('mismoEmpleador', function() {
    return function(input, empleador_id) {
          var salida = [];
          angular.forEach(input, function(l) {
              if (l.empleador_id == empleador_id) {
                salida.push(l);
              }
          })
          return salida;
    }
});

// --- Filtro mismo empleado
app.filter('mismoEmpleado', function() {
    return function(input, empleado_id) {
          var salida = [];
          angular.forEach(input, function(l) {
              if (l.empleado_id == empleado_id) {
                salida.push(l);
              }
          })
          return salida;
    }
});

// filtro para no repetir resultados en ng-repeat
app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];
      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
});

// registrar controlador
app.config(function ($controllerProvider) {
     app.controller = $controllerProvider.register;
});
/*app.config(function($controllerProvider) {
    app.cp = $controllerProvider;
});*/
/*app.config(['$controllerProvider',
       function ($controllerProvider) {
            app.registerController=$controllerProvider.register;
}]);*/
