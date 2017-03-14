	 SELECT  menu_principal.id,     	menu_principal.padre,           menu_principal.nombre,
	         menu_principal.href,   	menu_principal.permiso_grupo,   menu_principal.visible,
	         menu_principal.icon,		menu_principal.ancho,			menu_principal.alto,
	         menu_principal.ajustable,
	         ifnull( padre.nombre,'MODULO') AS padre_nombre
       FROM  menu_principal
  LEFT JOIN  menu_principal padre ON
             (menu_principal.padre = padre.id);