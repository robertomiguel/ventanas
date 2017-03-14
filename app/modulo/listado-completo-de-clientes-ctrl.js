app.controller("listado-completo-de-clientes-ctrl", function ($scope, $http) {
   $scope.ventanaID = "ventana_19";
   $scope.listadoClientes = [];

   $http({
      		method  : 'post',
         	url 	: '/menu/cliente/listadoCompleto'
    	 }).then(function successCallback(response) {
            $scope.listadoClientes = response.data;
           }, function errorCallback(response) {
                  alert('Error al cargar clientes: ' + response.data);
    });

});