// routes/notificacionesRoutes.js

const express = require('express');
const router = express.Router();
const notificacionesController = require('../controller/notificacionesController');

// Ruta para obtener todas las notificaciones
router.get('/notificaciones', notificacionesController.obtenerNotificaciones);

// Ruta para crear una nueva notificación
router.post('/notificaciones', notificacionesController.crearNotificacion);

// Ruta para obtener una notificación por ID
router.get('/notificaciones/:id', notificacionesController.obtenerNotificacionPorId);

// Ruta para actualizar una notificación por ID
router.put('/notificaciones/:id', notificacionesController.actualizarNotificacion);

// Ruta para eliminar una notificación por ID
router.delete('/notificaciones/:id', notificacionesController.eliminarNotificacion);

module.exports = router;