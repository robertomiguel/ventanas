// --------- LIBRERIAS
var express       = require('express'); // --- Framework Express
var app           = express();          // Instancia principal para uso de Express
var path          = require("path");    // --- Uso para rutas de directorios
var http          = require("http");    // --- Uso para el servicio del servidor

// --- CARGA DE RUTAS
var rutaMenuPrincipal = require('./rutas/menu_principal-rutas.js'); // --- Rutas para menu principal /menu/*
app.use('/menu', rutaMenuPrincipal); // --- cargar rutas del menu principal con el prefijo /menu

// --- RUTA WEB PUBLICA RAIZ '/'
var staticPath = path.join(__dirname, "www"); // --- Define directorio web público de la APP
app.use(express.static(staticPath)); // --- Asocia la ruta pública a express

// ------ CONTROL DE SESIONES (sin configurar)
app.use(function(req, res, next) {
    console.log("PETICION: " + req.method + " RUTA: " + req.url); // mensaje por consola
    if (true) { // --- Acá el control, si es true continua, si es false, corta y no procesa las siguientes rutas
        next(); // --- NEXT() indica que el usuario tiene acceso
    } else {
        res.end('cuac!'); // --- si el usuario no tiene acceso, en esta parte se corta.
    }
});

// ------ INICIAR SERVER
app.listen(3000, function() {
 console.log("Web Server *:3000");
});