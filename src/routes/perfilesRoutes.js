// routes/perfilesRoutes.js

const express = require('express');
const router = express.Router();
const perfilesController = require('../controller/perfilesController');

// Ruta para obtener todos los perfiles
router.get('/perfiles', perfilesController.obtenerPerfiles);

// Ruta para crear un nuevo perfil
router.post('/perfiles', perfilesController.crearPerfil);

// Ruta para obtener un perfil por ID
router.get('/perfiles/:id', perfilesController.obtenerPerfilPorId);

// Ruta para actualizar un perfil por ID
router.put('/perfiles/:id', perfilesController.actualizarPerfil);

// Ruta para eliminar un perfil por ID
router.delete('/perfiles/:id', perfilesController.eliminarPerfil);

module.exports = router;