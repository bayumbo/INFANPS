// gestionContenidosRoutes.js

const express = require('express');
const router = express.Router();
const gestionContenidosController = require('../controllers/gestionContenidosController');

// Definir rutas para gestión de contenidos
router.get('/gestion-contenidos', gestionContenidosController.obtenerGestionContenido);
router.post('/gestion-contenidos/agregar', gestionContenidosController.crearGestionContenido);
router.get('/gestion-contenidos/:id', gestionContenidosController.obtenerGestionContenidoPorId);
router.put('/gestion-contenidos', gestionContenidosController.actualizarGestionContenido)
router.delete('/gestion-contenidos/:id', gestionContenidosController.eliminarGestionContenido);

module.exports = router;