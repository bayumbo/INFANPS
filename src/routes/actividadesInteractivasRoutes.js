// actividadesInteractivasRoutes.js

const express = require('express');
const router = express.Router();
const actividadesInteractivasController = require('../controllers/actividadesInteractivasController');

// Definir rutas para actividades interactivas
router.get('/actividades-interactivas', actividadesInteractivasController.obtenerActividades);
router.post('/actividades-interactivas', actividadesInteractivasController.crearActividad);
router.get('/actividades-interactivas/:id', actividadesInteractivasController.obtenerActividadPorId);
router.put('/actividades-interactivas/:id', actividadesInteractivasController.actualizarActividad);
router.delete('/actividades-interactivas/:id', actividadesInteractivasController.eliminarActividad);

module.exports = router;