// forosRoutes.js

const express = require('express');
const router = express.Router();
const forosController = require('../controllers/forosController');

// Definir rutas para foros
router.get('/foros', forosController.obtenerForos);
router.post('/foros/crear', forosController.crearForo);
router.get('/foros/:id', forosController.obtenerForoPorId);

router.put('/foros/editar/:id', forosController.actualizarForo);
router.get('/foros/eliminar/:id', forosController.eliminarForo);


module.exports = router;