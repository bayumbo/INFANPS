// routes/programacionPublicacionRoutes.js

const express = require('express');
const router = express.Router();
const programacionPublicacionController = require('../controller/programacionPublicacionController');

// Ruta para obtener todas las programaciones de publicación
router.get('/programacion-publicacion', programacionPublicacionController.obtenerProgramacionPublicaciones);

// Ruta para crear una nueva programación de publicación
router.post('/programacion-publicacion', programacionPublicacionController.crearProgramacionPublicacion);

// Ruta para obtener una programación de publicación por ID
router.get('/programacion-publicacion/:id', programacionPublicacionController.obtenerProgramacionPublicacionPorId);

// Ruta para actualizar una programación de publicación por ID
router.put('/programacion-publicacion/:id', programacionPublicacionController.actualizarProgramacionPublicacion);

// Ruta para eliminar una programación de publicación por ID
router.delete('/programacion-publicacion/:id', programacionPublicacionController.eliminarProgramacionPublicacion);

module.exports = router;