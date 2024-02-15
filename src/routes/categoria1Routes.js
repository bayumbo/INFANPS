// categoria1Routes.js

const express = require('express');
const router = express.Router();
const categoria1Controller = require('../controllers/categoria1Controller');

// Definir rutas para categoría 1
router.get('/categoria1', categoria1Controller.obtenerCategorias1);
router.post('/categoria1', categoria1Controller.crearCategoria1);
router.get('/categoria1/:id', categoria1Controller.obtenerCategoria1PorId);
router.put('/categoria1/:id', categoria1Controller.actualizarCategoria1);
router.delete('/categoria1/:id', categoria1Controller.eliminarCategoria1);

module.exports = router;
