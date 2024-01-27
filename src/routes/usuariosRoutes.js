// routes/usuariosRoutes.js

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuariosController.obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/usuarios', usuariosController.crearUsuario);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', usuariosController.obtenerUsuarioPorId);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', usuariosController.actualizarUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', usuariosController.eliminarUsuario);

module.exports = router;