// routes/relacionCategoriasContenidoRoutes.js

const express = require('express');
const router = express.Router();
const relacionCategoriasContenidoController = require('../controllers/relacionCategoriasContenidoController')

// Ruta para obtener todas las relaciones categorías-contenido
router.get('/relacion-categorias-contenido', relacionCategoriasContenidoController.obtenerRelacionCategoriasContenido);

// Ruta para crear una nueva relación categorías-contenido
router.post('/relacion-categorias-contenido', relacionCategoriasContenidoController.crearRelacionCategoriasContenido);

// Ruta para obtener una relación categorías-contenido por ID
router.get('/relacion-categorias-contenido/:id', relacionCategoriasContenidoController.obtenerRelacionCategoriasContenidoPorId);

// Ruta para actualizar una relación categorías-contenido por ID
router.put('/relacion-categorias-contenido/:id', relacionCategoriasContenidoController.actualizarRelacionCategoriasContenido);

// Ruta para eliminar una relación categorías-contenido por ID
router.delete('/relacion-categorias-contenido/:id', relacionCategoriasContenidoController.eliminarRelacionCategoriasContenido);

module.exports = router;