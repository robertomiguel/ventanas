app.controller("form-toolbox-ctrl", function ($scope, $http) {
   $scope.ventanaID = "ventana_41";
   $scope.editar    = '';
   $scope.sel       = ''
   $scope.elementoID = 0;

  	$scope.agregar = function(tipo, resize) {

      $scope.elementoID ++;
      var id = $scope.elementoID;
      var elementoID = tipo+'_' + id;
      var nuevoElemento = $('.'+tipo).clone();
      nuevoElemento.attr('id', elementoID);
      
      if (tipo=='form_recu') {
        $('.editar-formulario').prepend(nuevoElemento);
      } else {
        $('.editar-formulario').append(nuevoElemento);
      }
      $('.editar-formulario').selectable();
      nuevoElemento.draggable(
          {   cancel: '', grid: [ 10, 10 ],
              containment : $('.editar-formulario') }
          ).resizable({handles: resize, grid : [ 10, 10 ]}).on("click", function(){
            //$(this).focus();
            $scope.sel = $(this).attr('id');
      });
  	}
});