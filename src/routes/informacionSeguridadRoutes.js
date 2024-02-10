// informacionSeguridadRoutes.js

const express = require('express');
const router = express.Router();
const informacionSeguridadController = require('../controllers/informacionSeguridadController');

// Definir rutas para información de seguridad
router.get('/informacion-seguridad', informacionSeguridadController.obtenerInformacionSeguridad);
router.post('/informacion-seguridad/crear', informacionSeguridadController.crearInformacionSeguridad);
router.get('/informacion-seguridad/:id', informacionSeguridadController.obtenerInformacionSeguridadPorId);
router.put('/informacion-seguridad/:id', informacionSeguridadController.actualizarInformacionSeguridad);
router.delete('/informacion-seguridad/:id', informacionSeguridadController.eliminarInformacionSeguridad);




module.exports = router;