// informacionSeguridadRoutes.js

const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const forosController = require('../controllers/informacionSeguridadController');

// Habilitar method-override
router.use(methodOverride('_method'));

// Definir rutas para foros
router.get('/informacion-seguridad', forosController.obtenerInformacion);
router.post('/informacion-seguridad/crear', forosController.crearInformacion);
router.get('/informacion-seguridad/:id', forosController.obtenerInformacionPorId);
router.get('/informacion-seguridad/:id', forosController.formularioInformacion)
    // Usar solo el método PUT para la actualización
router.put('/informacion-seguridad/editar/:id', forosController.actualizarInformacion);

router.get('/informacion-seguridad/eliminar/:id', forosController.eliminarInformacion);

module.exports = router;