const {Categoria1   } = require('../Database/dataBase.orm');
// Obtener todas las categorías
const obtenerCategorias1 = async (req, res) => {
    try {
        const categorias1 = await Categoria1.findAll();
        return res.render('Categoria1', { Categoria1 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener categorías 1' });
    }
};

// Crear una nueva categoría
const crearCategoria1 = async (req, res) => {
    try {
        const Categoria1= await Categoria1.create(req.body);
        return res.redirect('/Categoria1');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear categoría 1' });
    }
};

// Obtener una categoría por ID
const obtenerCategoria1PorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria1 = await Categoria1.findByPk(id);
        if (!categoria1) {
            return res.status(404).json({ mensaje: 'Categoría 1 no encontrada' });
        }
        return res.render('Categoria1', { Categoria1 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener categoría 1 por ID' });
    }
};

// Actualizar una categoría por ID
const actualizarCategoria1 = async (req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [Categoria1Actualizada]] = await Categoria1Actualizada.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Categoría 1 no encontrada' });
        }

        return res.redirect('/Categoria1');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar categoría 1' });
    }
};

// Eliminar una categoría por ID
const eliminarCategoria1 = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Categoria1.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Categoría 1 no encontrada' });
        }

        return res.redirect('/Categoria1');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar categoría 1' });
    }
};

module.exports = {
    obtenerCategorias1,
    crearCategoria1,
    obtenerCategoria1PorId,
    actualizarCategoria1,
    eliminarCategoria1,
};