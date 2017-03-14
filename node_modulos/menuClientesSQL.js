var menuClientesSQL = function(fs, mysql, conexionMySQL) {
	
	const ruta = '/../app/modulo/clientes/';
	
	this.listadoCompleto = function(callback) {
			var sql = fs.readFileSync(__dirname+ruta+'listado_completo.sql').toString();
			conexionMySQL.query(sql, function(err, rows, fields) {
	            if (err) throw err;
	            if (rows.length > 0) {
	             callback(rows);
	            } else {
	              console.log('no hay datos');
	              callback({error: 'error al cargar.'});
	            }
	      	});
	}

	return this;
}

module.exports = menuClientesSQL;