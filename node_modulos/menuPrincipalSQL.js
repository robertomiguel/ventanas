var menuPrincipalSQL = function(fs, mysql, conexionMySQL) {

	this.listar = function(callback) {
			var sql = fs.readFileSync(__dirname+'/../app/sql_general/menu_principal.sql').toString();
			conexionMySQL.query(sql, function(err, rows, fields) {
	            if (err) throw err;
	            if (rows.length > 0) {
	             callback(rows);
	            } else {
	              console.log('no hay datos');
	              callback({error: 'error al cargar menú.'});
	            }
	      	});
	}

	return this;
}

module.exports = menuPrincipalSQL;