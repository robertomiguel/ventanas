SELECT	e.id              AS empleador_id,
        e.cuit            AS empleador_cuit,
        trim(e.nombre)    AS empleador,
        ifnull(e.baja,'') AS empleador_baja,

        ifnull(em.id,'')            AS empleado_id,
        ifnull(em.cuil,'')          AS empleado_cuil,
        ifnull(trim(em.nombre),'')  AS empleado,

        bs.id                   AS boleta_id,
        bs.periodo              AS boleta_periodo,
        ifnull(ebs.salario,'')  AS boleta_salario,
        ifnull(bs.pago,'')      AS boleta_pago

  FROM 	boleta_sindical bs

  JOIN	empleador e ON
   (bs.empleador_id = e.id)

LEFT JOIN	emp_bol_sin ebs ON
   (ebs.boletasindical_id = bs.id)

LEFT JOIN	empleado em ON
   (ebs.empleado_id = em.id)

 WHERE  	bs.periodo > DATE_SUB(CurDate(), INTERVAL 4 MONTH)
 
ORDER BY 	em.nombre, e.nombre, bs.periodo
