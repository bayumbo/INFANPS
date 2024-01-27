const { Categorias } = require('../models');

const obtenerCategorias = async(req, res) => {
    try {
        const categorias = await Categorias.findAll();
        return res.json(categorias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener categorías' });
    }
};

const crearCategoria = async(req, res) => {
    try {
        const nuevaCategoria = await Categorias.create(req.body);
        return res.json(nuevaCategoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear categoría' });
    }
};

const obtenerCategoriaPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categorias.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        return res.json(categoria);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener categoría por ID' });
    }
};

const actualizarCategoria = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [categoriaActualizada]] = await Categorias.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        return res.json(categoriaActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar categoría' });
    }
};

const eliminarCategoria = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Categorias.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        return res.json({ mensaje: 'Categoría eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar categoría' });
    }
};

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria,
};