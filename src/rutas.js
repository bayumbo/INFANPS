const express = require('express');
const router = express.Router();

// Importar los controladores
const usuariosController = require('./controllers/usuariosController');
const perfilesController = require('./controllers/perfilesController');
const informacionSeguridadController = require('./controllers/informacionSeguridadController');
const actividadesInteractivasController = require('./controllers/actividadesInteractivasController');
const forosController = require('./controllers/forosController');
const mensajesForoController = require('./controllers/mensajesForoController');
const notificacionesController = require('./controllers/notificacionesController');
const gestionContenidosController = require('./controllers/gestionContenidosController');
const categoriasController = require('./controllers/categoriasController');
const relacionCategoriasContenidoController = require('./controllers/relacionCategoriasContenidoController');
const programacionPublicacionController = require('./controllers/programacionPublicacionController');

// Definir rutas para usuarios
router.get('/usuarios', usuariosController.obtenerUsuarios);
router.post('/usuarios', usuariosController.crearUsuario);

// Definir rutas para perfiles
router.get('/perfiles', perfilesController.obtenerPerfiles);
router.post('/perfiles', perfilesController.crearPerfil);

// Definir rutas para información de seguridad
router.get('/informacion-seguridad', informacionSeguridadController.obtenerInformacionSeguridad);
router.post('/informacion-seguridad', informacionSeguridadController.crearInformacionSeguridad);

// Definir rutas para actividades interactivas
router.get('/actividades-interactivas', actividadesInteractivasController.obtenerActividades);
router.post('/actividades-interactivas', actividadesInteractivasController.crearActividad);

// Definir rutas para foros
router.get('/foros', forosController.obtenerForos);
router.post('/foros', forosController.crearForo);

// Definir rutas para mensajes de foro
router.get('/mensajes-foro', mensajesForoController.obtenerMensajesForo);
router.post('/mensajes-foro', mensajesForoController.crearMensajeForo);

// Definir rutas para notificaciones
router.get('/notificaciones', notificacionesController.obtenerNotificaciones);
router.post('/notificaciones', notificacionesController.crearNotificacion);

// Definir rutas para gestión de contenidos
router.get('/gestion-contenidos', gestionContenidosController.obtenerContenidos);
router.post('/gestion-contenidos', gestionContenidosController.crearContenido);

// Definir rutas para categorías
router.get('/categorias', categoriasController.obtenerCategorias);
router.post('/categorias', categoriasController.crearCategoria);

// Definir rutas para relación de categorías y contenidos
router.get('/relacion-categorias-contenido', relacionCategoriasContenidoController.obtenerRelacion);
router.post('/relacion-categorias-contenido', relacionCategoriasContenidoController.crearRelacion);

// Definir rutas para programación de publicación
router.get('/programacion-publicacion', programacionPublicacionController.obtenerProgramacion);
router.post('/programacion-publicacion', programacionPublicacionController.programarPublicacion);

module.exports = router;