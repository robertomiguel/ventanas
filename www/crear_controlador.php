<?php 

// Crear www/app/nombre-controlador-ctrl.js
	$ventanaID 	= 'ventana_'.$_POST["id"];
	$href 		= $_POST["href"];

	$archivo = '/home/roberto/menu/www/app/'.$href.'-ctrl.js';

	$texto = file_get_contents('/home/roberto/menu/www/app/controlador-base.js');

	$texto = str_replace('$ventanaID$', $ventanaID, $texto);
	$texto = str_replace('$href$', $href, $texto);

	$res1 = file_put_contents($archivo, $texto);

// Agregar al indice.html
	$index_html = '/home/roberto/menu/www/index.html';

	$archivo 	= $href.'-ctrl.js';

	$texto 		= explode('<!--controladores-->', file_get_contents($index_html));

	$agregar 	= "<script src='/app/$archivo'></script>\n\t\t<!--controladores-->";

	$res2 		= file_put_contents($index_html, $texto[0].$agregar.$texto[1]);

	echo $res1.':'.$res2;

?>