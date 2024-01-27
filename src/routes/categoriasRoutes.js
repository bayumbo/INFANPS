// categoriasRoutes.js

const express = require('express');
const router = express.Router();
const categoriasController = require('../controller/categoriasController');

// Definir rutas para categorías
router.get('/categorias', categoriasController.obtenerCategorias);
router.post('/categorias', categoriasController.crearCategoria);
router.get('/categorias/:id', categoriasController.obtenerCategoriaPorId);
router.put('/categorias/:id', categoriasController.actualizarCategoria);
router.delete('/categorias/:id', categoriasController.eliminarCategoria);

module.exports = router;