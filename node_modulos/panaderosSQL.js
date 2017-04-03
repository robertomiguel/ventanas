var panaderosSQL = function(fs, mysql, conexionMySQL) {

	const ruta = '/../app/modulo/clientes/';

	this.empleadosXempleador = function(callback) {
			var sql = fs.readFileSync(__dirname+ruta+'empleadosXempleadores.sql').toString();
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

	this.listadoPanaderos = function(callback) {
			var sql = fs.readFileSync(__dirname+ruta+'listadoPanaderos.sql').toString();
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

module.exports = panaderosSQL;
