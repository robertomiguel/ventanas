app.controller("editar-menu-principal-ctrl", function ($scope, $http, menuPrincipal) {
   //$scope.ventanaID = 'editar-menu-principal';
   $scope.ventanaID = 'ventana_40';
 /*   $scope.menuPrincipal = menuPrincipal.data;
   $scope.cargar = function() {
      $scope.menuPrincipal = menuPrincipal.data;
   }*/
   $scope.padre       = '-';
   $scope.nombre      = '-';
   $scope.href        = '-';
   $scope.icon        = '-';
   $scope.menuID      = '-';
   $scope.ancho       = '-';
   $scope.alto        = '-';
   $scope.ajustable   = '-';
   $scope.sel 	      = -1;

   $scope.editar = function(i) {
	  $scope.padre      = $scope.menuPrincipal[i]['padre'];
	  $scope.nombre     = $scope.menuPrincipal[i]['nombre'];
	  $scope.href       = $scope.menuPrincipal[i]['href'];
    $scope.icon       = $scope.menuPrincipal[i]['icon'];
    $scope.menuID     = $scope.menuPrincipal[i]['id'];
    $scope.ancho      = $scope.menuPrincipal[i]['ancho'];
    $scope.alto       = $scope.menuPrincipal[i]['alto'];
    $scope.ajustable  = $scope.menuPrincipal[i]['ajustable'];
	  $scope.sel 	      = i;
   }

  $scope.grabar = function(i) {
   	$scope.menuPrincipal[i]['padre']      = $scope.padre;
   	$scope.menuPrincipal[i]['nombre']     = $scope.nombre;
   	$scope.menuPrincipal[i]['href']       = $scope.href;
    $scope.menuPrincipal[i]['icon']       = $scope.icon;
    $scope.menuPrincipal[i]['ancho']      = $scope.ancho;
    $scope.menuPrincipal[i]['alto']       = $scope.alto;
    $scope.menuPrincipal[i]['ajustable']  = $scope.ajustable;
  }

   $scope.crear_controlador = function(ventanaID, href) {
       $.post("/crear_controlador.php",{
            id: ventanaID, href : href
          },
        function(data){
            alert(data);
          });
   }

   $scope.crear_plantilla_base = function(nombre_plantilla) {
       $.post("/crear_plantilla_base.php",{
            nombre: nombre_plantilla
       },
        function(data){
            alert(data);
          });
   }
});