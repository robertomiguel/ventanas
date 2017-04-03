function cargar_panaderos(b) {
    $(b).prop('disabled', true);
    var cuerpo = $('#ventana_43 .ventana-body');
    var cabeza = $('#ventana_43 .ventana-header');

    cuerpo.html('cargando lista...');

    $.post( '/menu/cliente/listadoPanaderos', function( respuesta ) {

        // Crear lista de panaderias
        var lista = [];
        var keys = [];
        respuesta.forEach(function(e) {
            var key = e.empleador_id;
            if (keys.indexOf(key) === -1) {
                lista.push({
                    empleador_id   : e.empleador_id,
                    empleador      : e.empleador,
                    empleador_baja : e.empleador_baja,
                    empleador_cuit : e.empleador_cuit
                });
                keys.push(key);
            }
        }, this);

        // Cargar panaderias
        cuerpo.html('<ul>');
            lista.forEach(function(e) {
                cuerpo.append('<li id="empr_'+e.empleador_id+'">'
                                + e.empleador_id + '. '
                                + e.empleador
                                + ' Cuit: ' + e.empleador_cuit
                                + ' Baja: ' + e.empleador_baja
                              + '</li>');
            }, this);
        cuerpo.append('</ul>');
        cabeza.append('Total Empleadores: '+lista.length);

        // Crear lista de trabajadores
        lista = [];
        keys = [];
        respuesta.forEach(function(e) {
            var key = e.empleado_id;
            if (keys.indexOf(key) === -1) {
                lista.push({
                    empleado_id   : e.empleado_id,
                    empleado      : e.empleado,
                    empleador_id  : e.empleador_id,
                    boleta_periodo: e.boleta_periodo
                });
                keys.push(key);
            }
        }, this);

        // Cargar trabajadores
            respuesta.forEach(function(e) {
              var fecha = new Date(e.boleta_periodo);
                $('#empr_'+e.empleador_id).append('<p>'
                                                      + e.empleado+' Período:'
                                                      + mes(fecha.getMonth())
                                                      + '-' + fecha.getFullYear()
                                                  +'</p>')
            }, this);
        cabeza.append(' - Total de trabajadores: ' + lista.length);

    });
}

function mes(n) {
  switch (n) {
    case 0:
      return 'Enero';
    break;
    case 1:
      return 'Febrero';
    break;
    case 2:
      return 'Marzo';
    break;
    case 3:
      return 'Abril';
    break;
    case 4:
      return 'Mayo';
    break;
    case 5:
      return 'Junio';
    break;
    case 6:
      return 'Julio';
    break;
    case 7:
      return 'Agosto';
    break;
    case 8:
      return 'Septiembre';
    break;
    case 9:
      return 'Octubre';
    break;
    case 10:
      return 'Noviembre';
    break;
    case 11:
      return 'Diciembre';
    break;
    default:
      return 'cuac!';

  }
}
