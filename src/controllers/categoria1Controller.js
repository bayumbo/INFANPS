// controllers/categoria1Controller.js
const { Categoria1 } = require('../Database/dataBase.orm');

// Obtener todas las categorías 1 y renderizar la vista
const obtenerCategorias1 = async (req, res) => {
    try {
        const categorias1 = await Categoria1.findAll();
        return res.render('categoria1', { categorias1 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener categorías 1' });
    }
};

// Obtener una categoría 1 por su ID y renderizar la vista
const obtenerCategoria1PorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria1 = await Categoria1.findByPk(id);
        if (!categoria1) {
            return res.status(404).json({ mensaje: 'Categoría 1 no encontrada' });
        }
        return res.render('categoria1Detalles', { categoria1 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener categoría 1 por ID' });
    }
};

// Crear una nueva categoría 1 y redirigir a la lista de categorías 1
const crearCategoria1 = async (req, res) => {
    try {
        const { titulo, contenido, fecha_publicacion, id_autor, multimedia_tipo_contenido, multimedia_descripcion, multimedia_url } = req.body;

        const nuevaCategoria1 = await Categoria1.create({
            titulo,
            contenido,
            fecha_publicacion,
            id_autor,
            multimedia_tipo_contenido,
            multimedia_descripcion,
            multimedia_url,
        });

        // Redirigir a la lista de categorías 1
        return res.redirect('/categoria1');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear categoría 1' });
    }
};

// Actualizar una categoría 1 por su ID y redirigir a la lista de categorías 1
const actualizarCategoria1 = async (req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [categoria1Actualizada]] = await Categoria1.update(req.body, {where: { id },returning: true,
        });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Categoría 1 no encontrada' });
        }

        // Redirigir a la lista de categorías 1
        return res.redirect('/categoria1');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Actualizar categoría 1 con éxito' });
    }
};

// Eliminar una categoría 1 por su ID y redirigir a la lista de categorías 1
const eliminarCategoria1 = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Categoria1.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Categoría 1 no encontrada' });
        }

        // Redirigir a la lista de categorías 1
        return res.redirect('/categoria1');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar categoría 1' });
    }
};

module.exports = {
    obtenerCategorias1,
    obtenerCategoria1PorId,
    crearCategoria1,
    actualizarCategoria1,
    eliminarCategoria1,
};
