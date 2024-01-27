// actividadesInteractivasRoutes.js

const express = require('express');
const router = express.Router();
const actividadesInteractivasController = require('../controllers/actividadesInteractivasController');

// Definir rutas para actividades interactivas
router.get('/actividades-interactivas', actividadesInteractivasController.obtenerActividadesInteractivas);
router.post('/actividades-interactivas', actividadesInteractivasController.crearActividadInteractiva);
router.get('/actividades-interactivas/:id', actividadesInteractivasController.obtenerActividadInteractivaPorId);
router.put('/actividades-interactivas/:id', actividadesInteractivasController.actualizarActividadInteractiva);
router.delete('/actividades-interactivas/:id', actividadesInteractivasController.eliminarActividadInteractiva);

module.exports = router;