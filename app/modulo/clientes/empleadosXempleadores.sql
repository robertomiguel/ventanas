SELECT 	empleado.id 			AS empleado_id,     empleado.nombre AS empleado,
		    empleador.nombre 	AS empleador, 			empleador.id 		AS empleador_id
	FROM  emp_bol_sin
  JOIN empleado ON
       (empleado.id = emp_bol_sin.id)
  JOIN boleta_sindical ON
       (boleta_sindical.id = emp_bol_sin.boletasindical_id)
  JOIN empleador ON
       (empleador.id = boleta_sindical.empleador_id)
GROUP BY empleado.nombre, empleador.nombre
ORDER BY empleador.nombre
