SELECT  suscriptor.id AS id, 				suscriptor.dni AS dni,
		suscriptor.apellido AS apellido, 	suscriptor.nombre AS nombre,
		suscriptor.nacimiento AS fecha_nac, suscriptor.domicilio AS direccion,
		suscriptor.tel AS telefono1, 		suscriptor.celular AS telefono2,
        suscriptor.activo AS estado, 		suscriptor.created_at AS fecha_alta,
        suscriptor.updated_at AS fecha_mod, localidad.nombre AS localidad,
        localidad.cp AS codigo_postal, 		provincia.nombre AS provincia
  FROM 	suscriptor
  JOIN 	localidad ON
		(suscriptor.localidad_id = localidad.id)
  JOIN 	provincia ON
		(provincia.id = localidad.provincia_id);