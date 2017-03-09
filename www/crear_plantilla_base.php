<?php 
	$ventanaID = $_POST["nombre"];
	//$ventanaID = 'crea-algo-nuevo';

	$archivo = '/home/roberto/menu/www/app/'.$ventanaID.'.html';

	$texto = file_get_contents('/home/roberto/menu/www/app/plantillas/plantilla-base.html');

	$texto = str_replace('$ventanaID$', $ventanaID, $texto);

	$res = file_put_contents($archivo, $texto);

	echo $res;

?>