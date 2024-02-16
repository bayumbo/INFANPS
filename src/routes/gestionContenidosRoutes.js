// gestionContenidosRoutes.js

const express = require('express');
const router = express.Router();
const gestionContenidosController = require('../controllers/gestionContenidosController');

// Definir rutas para gestión de contenidos

router.get('/gestion-contenidos/foro', gestionContenidosController.obtenerContenidoForo);
router.get('/gestion-contenidos', gestionContenidosController.obtenerGestionCategoria);
router.post('/gestion-contenidos/cf', gestionContenidosController.crearCategoriaForo);
router.get('/gestion-contenidos/foro/:id', gestionContenidosController.obtenerContenidoForoPorId);
router.get('/gestion-contenidos/informacion', gestionContenidosController.obtenerInformacion);
router.post('/gestion-contenidos/ci', gestionContenidosController.crearInformacion);
router.get('/gestion-contenidos/foro/:id', gestionContenidosController.obtenerInformacionPorId);


module.exports = router;