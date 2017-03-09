var express = require('express');
var path    = require("path");
var http   = require("http");
var fs      = require("fs");
var bodyParser = require('body-parser');
var crearArchivo = require('./controladores/crearArchivo.js')



var app     = express();
//var server  = require('http').Server(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var staticPath = path.join(__dirname, "www");

app.use(express.static(staticPath));

app.use(function(req, res, next) {
 console.log("PETICION: " + req.method + " RUTA: " + req.url);
 if (true) {
    next();
 } else {
    res.end('cuac!');
 }
});

app.get('*', function(req, res){ 
      res.sendFile(__dirname + '/www'+req.url);
});
app.post('*', function(req, res){ 
   switch (req.url){
    case '/crear_controlador.php':
      res.send(crear_controlador(req.body.id, req.body.href));
    break;
    case '/crear_plantilla_base.php':
      //res.send('Plantilla: '+req.body.nombre);
      fs.readFile(__dirname+'/www/app/plantillas/plantilla-base.html', function(error, datos){
        if (error) {
            res.send('plantilla error lectura');
        } 
        else {
            var datos = datos.toString().replace('$ventanaID$', req.body.nombre);
            fs.writeFile(__dirname+'/modulos/'+req.body.nombre+'.html', datos, function(error){
              if (error) {
                  res.send('plantilla error escritura');
              } else {
                  res.send('PLANTILLA creada');
              }
            });
          }
      });
    break;
    default:
      res.sendFile(__dirname + '/www'+req.url);
  }
});


app.listen(3000, function() {
 console.log("Web Server *:3000");
});

function crear_controlador(id, href) {
  var datos = fs.readFileSync(__dirname+'/www/app/controlador-base.js').toString();
  datos = datos.replace('$href$', href).replace('$ventanaID$','ventana_'+id);
  return fs.writeFileSync(__dirname+'/modulos/'+href+'-ctrl.js', datos);
}