// gestionContenidosRoutes.js

const express = require('express');
const router = express.Router();
const gestionContenidosController = require('../controllers/gestionContenidosController');


// Definir rutas para gestión de contenidos
router.get('/gestion-contenidos', gestionContenidosController.obtenerGestionContenidos);
router.post('/gestion-contenidos', gestionContenidosController.crearGestionContenido);
router.get('/gestion-contenidos/:id', gestionContenidosController.obtenerGestionContenidoPorId);
router.put('/gestion-contenidos/:id', gestionContenidosController.actualizarGestionContenido);
router.delete('/gestion-contenidos/:id', gestionContenidosController.eliminarGestionContenido);
router.get('/holamundo/', gestionContenidosController.holaMundo);

module.exports = router;