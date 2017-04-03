app.controller("listado-panaderos-ctrl", function ($scope, $http) {
   $scope.ventanaID = "ventana_42";
   $scope.panaderos = [];

   $http({
         method  : 'post',
           url 	: '/menu/cliente/listadoPanaderos'
      }).then(function successCallback(response) {
            $scope.panaderos = response.data;
            response.data = null;
           }, function errorCallback(response) {
                  alert('Error al cargar clientes: ' + response.data);
    });
});
