<?php 

$sql = "
        SELECT  menu_principal.id,      menu_principal.padre,           menu_principal.nombre,
                menu_principal.href,    menu_principal.permiso_grupo,   menu_principal.visible,
                menu_principal.icon,
                ifnull( padre.nombre,'MODULO') AS padre_nombre
         FROM   menu_principal
    LEFT JOIN   menu_principal padre ON
                (menu_principal.padre = padre.id)
";

$mysqli = new mysqli('localhost','universal','universal','universal');
    $myArray = array();
    if ($result = $mysqli->query($sql)) {
        $tempArray = array();
        while($row = $result->fetch_object()) {
                $tempArray = $row;
                array_push($myArray, $tempArray);
            }
        echo json_encode($myArray);
    }

    $result->close();
    $mysqli->close();
?>