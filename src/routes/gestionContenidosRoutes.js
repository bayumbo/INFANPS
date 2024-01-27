// gestionContenidosRoutes.js

const express = require('express');
const router = express.Router();
const gestionContenidosController = require('../controllers/gestionContenidosController');

// Definir rutas para gestión de contenidos
router.get('/gestion-contenidos', gestionContenidosController.obtenerContenidos);
router.post('/gestion-contenidos', gestionContenidosController.crearContenido);
router.get('/gestion-contenidos/:id', gestionContenidosController.obtenerContenidoPorId);
router.put('/gestion-contenidos/:id', gestionContenidosController.actualizarContenido);
router.delete('/gestion-contenidos/:id', gestionContenidosController.eliminarContenido);

module.exports = router;