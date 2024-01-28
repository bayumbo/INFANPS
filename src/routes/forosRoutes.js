// forosRoutes.js

const express = require('express');
const router = express.Router();
const forosController = require('../controllers/forosController');

// Definir rutas para foros
router.get('/foros', forosController.obtenerForos);
router.post('/foros', forosController.crearForo);
router.get('/foros/:id', forosController.obtenerForoPorId);
router.put('/foros/:id', forosController.actualizarForo);
router.delete('/foros/:id', forosController.eliminarForo);

module.exports = router;