const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const forosController = require('../controllers/forosController');

// Habilitar method-override
router.use(methodOverride('_method'));

// Definir rutas para foros
router.get('/foros', forosController.obtenerForos);
router.post('/foros/crear', forosController.crearForo);
router.get('/foros/:id', forosController.obtenerForoPorId);
router.get('/foros/editar/:id', forosController.formularioForos)
router.post('/foros/editar/:id', forosController.actualizarForo);
router.get('/foros/eliminar/:id', forosController.eliminarForo);

module.exports = router;