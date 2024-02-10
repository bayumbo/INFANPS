// informacionSeguridadRoutes.js

const express = require('express');
const router = express.Router();
const informacionSeguridadController = require('../controllers/informacionSeguridadController');

// Definir rutas para información de seguridad
router.get('/informacion-seguridad', informacionSeguridadController.obtenerInformacionSeguridad);
router.post('/informacion-seguridad/crear', informacionSeguridadController.crearInformacionSeguridad);
router.get('/informacion-seguridad/editar/:id', informacionSeguridadController.obtenerInformacionSeguridadPorId);
router.put('/informacion-seguridad/editar/:id', informacionSeguridadController.actualizarInformacionSeguridad);
router.delete('/informacion-seguridad/eliminar/:id', informacionSeguridadController.eliminarInformacionSeguridad);
router.delete('/informacion-seguridad/eliminar/:id', informacionSeguridadController.eliminarInformacionSeguridad);




module.exports = router;