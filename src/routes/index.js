// routes/index.js

const express = require('express');
const router = express.Router();

// Importar las rutas
const informacionSeguridadRoutes = require('./informacionSeguridadRoutes');
const gestionContenidosRoutes = require('./gestionContenidosRoutes');
const forosRoutes = require('./forosRoutes');
const categoriasRoutes = require('./categoriasRoutes');
const actividadesInteractivasRoutes = require('./actividadesInteractivasRoutes');
const mensajesForoRoutes = require('./mensajesForoRoutes');
const notificacionesRoutes = require('./notificacionesRoutes');
const perfilesRoutes = require('./perfilesRoutes');
const programacionPublicacionRoutes = require('./programacionPublicacionRoutes');
const relacionCategoriasContenidoRoutes = require('./relacionCategoriasContenidoRoutes');
const usuariosRoutes = require('./usuariosRoutes');

// Agregar las rutas al enrutador principal
router.use(informacionSeguridadRoutes);
router.use(gestionContenidosRoutes);
router.use(forosRoutes);
router.use(categoriasRoutes);
router.use(actividadesInteractivasRoutes);
router.use(mensajesForoRoutes);
router.use(notificacionesRoutes);
router.use(perfilesRoutes);
router.use(programacionPublicacionRoutes);
router.use(relacionCategoriasContenidoRoutes);
router.use(usuariosRoutes);



module.exports = router;