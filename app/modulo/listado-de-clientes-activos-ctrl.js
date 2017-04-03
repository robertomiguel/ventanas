app.controller("listado-de-clientes-activos-ctrl", function ($scope, $http) {
   $scope.ventanaID = "ventana_20";
   $scope.eXe = [];

   $http({
         method  : 'post',
           url 	: '/menu/cliente/eXe'
      }).then(function successCallback(response) {
            $scope.eXe = response.data;
           }, function errorCallback(response) {
                  alert('Error al cargar clientes: ' + response.data);
    });

});
