var express = require('express');
var router 	= express.Router();
var fs      = require("fs");      // --- Uso para manejo de archivos
var mysql   = require('mysql');       // --- Uso para acceso a Mysql
var path          = require("path");    // --- Uso para rutas de directorios

var bodyParser    = require('body-parser'); // --- Uso para leer datos JSON en peticiónes POST

// --- CONFIG PARA USAR JSON EN METICIONES POST
router.use(bodyParser.json()); // --- support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // --- support encoded bodies

// ------- CONFIGURACION DB
var conexionMySQL = mysql.createConnection({
                      host     : 'localhost',
                      user     : 'universal',
                      password : 'universal',
                      database : 'universal'
                    });
var conexion_pana_MySQL = mysql.createConnection({
                      host     : 'localhost',
                      user     : 'panadero',
                      password : 'panadero',
                      database : 'panaderos'
                    });
conexionMySQL.connect(); // Conectar a la DB
conexion_pana_MySQL.connect();

var crearArchivo      = require('../node_modulos/crearArchivo.js')(fs); // --- Manejo de archivos de las ventanas (.HTML, .CSS, .JS)
var menuPrincipalSQL  = require('../node_modulos/menuPrincipalSQL.js')(fs, mysql, conexionMySQL); // --- Manejo del menu principal
var clientesSQL       = require('../node_modulos/menuClientesSQL.js')(fs, mysql, conexionMySQL); // --- Manejo de módulo clientes
var panaderosSQL      = require('../node_modulos/panaderosSQL.js')(fs, mysql, conexion_pana_MySQL); // --- Manejo de módulo clientes

// --- middleware para control de esta ruta
router.use(function timeLog(req, res, next) {
  console.log("PETICION: " + req.method + " RUTA: " + req.url);
  next();
});

// --- Ruta: /menu
router.post('/', function(req, res) {
	menuPrincipalSQL.listar(function(resultado){
       res.send(resultado);
    });
});
router.get('/', function(req, res){
    menuPrincipalSQL.listar(function(resultado){
      res.send(resultado);
    });
});
// --- Rutas: /menu/crear_controlador
router.post('/crear_controlador', function(req, res) {
	crearArchivo.controlador(req.body, function(resultado){
       res.send(resultado);
    });
});

// --- Rutas: /menu/crear_plantilla_base
router.post('/crear_plantilla_base', function(req, res) {
	crearArchivo.plantilla(req.body, function(resultado){
       res.send(resultado);
    });
});

// --- Rutas de lanzadores del menu
router.get('/app/*', function(req, res){
    res.sendFile(path.resolve (__dirname + '/../app' + req.url.replace('/app','')));
});

router.post('/app/*', function(req, res){
    res.sendFile(path.resolve (__dirname + '/../app' + req.url.replace('/app','')));
});

// --- Clientes
router.post('/cliente/listadoCompleto', function(req, res){
  clientesSQL.listadoCompleto(function(resultado){
       res.send(resultado);
    });
});

router.post('/cliente/eXe', function(req, res){
  panaderosSQL.empleadosXempleador(function(resultado){
       res.send(resultado);
    });
});

router.post('/cliente/listadoPanaderos', function(req, res){
  panaderosSQL.listadoPanaderos(function(resultado){
       res.send(resultado);
    });
});

module.exports = router;
