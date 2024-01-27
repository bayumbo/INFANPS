// routes/mensajesForoRoutes.js

const express = require('express');
const router = express.Router();
const mensajesForoController = require('../controller/mensajesForoController');

// Ruta para obtener todos los mensajes de foro
router.get('/mensajes-foro', mensajesForoController.obtenerMensajesForo);

// Ruta para crear un nuevo mensaje de foro
router.post('/mensajes-foro', mensajesForoController.crearMensajeForo);

// Ruta para obtener un mensaje de foro por ID
router.get('/mensajes-foro/:id', mensajesForoController.obtenerMensajeForoPorId);

// Ruta para actualizar un mensaje de foro por ID
router.put('/mensajes-foro/:id', mensajesForoController.actualizarMensajeForo);

// Ruta para eliminar un mensaje de foro por ID
router.delete('/mensajes-foro/:id', mensajesForoController.eliminarMensajeForo);

module.exports = router;