app.controller("editar-menu-principal-ctrl", function ($scope, $http, menuPrincipal) {
   //$scope.ventanaID = 'editar-menu-principal';
   $scope.ventanaID = 'ventana_40';
 /*   $scope.menuPrincipal = menuPrincipal.data;
   $scope.cargar = function() {
      $scope.menuPrincipal = menuPrincipal.data;
   }*/
   $scope.itemMenu = [];
   $scope.sel 	      = -1;

   $scope.editar = function(i) {
    $scope.sel 	      = i;
    $scope.itemMenu = angular.copy($scope.menuPrincipal[i]);
   }

  $scope.grabar = function(i) {
    $scope.menuPrincipal[i] = angular.copy($scope.itemMenu);
    $scope.$apply;
  }

   $scope.crear_controlador = function(ventanaID, href) {
    alert(href+':'+ventanaID);
       $.post("/menu/crear_controlador",{
            id: ventanaID, href : href
          },
        function(data){
            alert(data);
          });
   }

   $scope.crear_plantilla_base = function(nombre_plantilla, id) {
       $.post("/menu/crear_plantilla_base",{
            nombre: nombre_plantilla, ventanaID: 'ventana_'+id
       },
        function(data){
            alert(data);
          });
   }
});