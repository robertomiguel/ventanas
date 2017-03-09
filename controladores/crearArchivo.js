var crearArchivo = function(json) {

	this.controlador = function(json) {
		var texto = fs.readFileSync(__dirname+'/www/app/controlador-base.js').toString();
  		texto = texto.replace('$href$', json.href).replace('$ventanaID$','ventana_'+json.id);
  		fs.writeFileSync(__dirname+'/modulos/'+json.href+'-ctrl.js', texto);
  		return 'ok';
	}

	return this;
}

module.exports = crearArchivo;