var crearArchivo = function(fs) {

	this.controlador = function(json, respuesta) {
		// cargar texto desde archivo
		var texto = fs.readFileSync(__dirname+'/../app/plantilla/controlador-base.js').toString();
  		// configurar las ide de ventana
  		texto = texto.replace('$href$', json.href).replace('$ventanaID$','ventana_'+json.id);
  		// escribir el nuevo archivo
  		fs.writeFileSync(__dirname+'/../app/modulo/'+json.href+'-ctrl.js', texto);
  		respuesta('ok controlador');
	}

	this.plantilla = function(json, respuesta) {
		// plantilla HTML
		var texto = fs.readFileSync(__dirname+'/../app/plantilla/plantilla-base.html').toString();
  		texto = texto.split('$ventanaID$').join(json.nombre);
  		fs.writeFileSync(__dirname+'/../app/modulo/'+json.nombre+'.html', texto);

		// plantilla CSS
		var texto = fs.readFileSync(__dirname+'/../app/plantilla/plantilla-base.css').toString();
  		texto = texto.split('$ventanaID$').join(json.ventanaID);
  		fs.writeFileSync(__dirname+'/../app/modulo/'+json.nombre+'.css', texto);
  		
  		respuesta('ok plantilla');
	}

	return this;
}

module.exports = crearArchivo;