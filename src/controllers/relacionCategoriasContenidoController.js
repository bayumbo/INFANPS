const { RelacionCategoriasContenido, GestionContenidos, Categorias } = require('../Database/dataBase.orm');

const obtenerRelacionCategoriasContenido = async(req, res) => {
    try {
        const relacionCategoriasContenido = await RelacionCategoriasContenido.findAll();
        return res.json(relacionCategoriasContenido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener relación categorías-contenido' });
    }
};

const crearRelacionCategoriasContenido = async(req, res) => {
    try {
        const nuevaRelacionCategoriasContenido = await RelacionCategoriasContenido.create(req.body);
        return res.json(nuevaRelacionCategoriasContenido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear relación categorías-contenido' });
    }
};

const obtenerRelacionCategoriasContenidoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const relacionCategoriasContenido = await RelacionCategoriasContenido.findByPk(id);
        if (!relacionCategoriasContenido) {
            return res.status(404).json({ mensaje: 'Relación categorías-contenido no encontrada' });
        }
        return res.json(relacionCategoriasContenido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener relación categorías-contenido por ID' });
    }
};

const actualizarRelacionCategoriasContenido = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [relacionCategoriasContenidoActualizada]] = await RelacionCategoriasContenido.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Relación categorías-contenido no encontrada' });
        }
        return res.json(relacionCategoriasContenidoActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar relación categorías-contenido' });
    }
};

const eliminarRelacionCategoriasContenido = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await RelacionCategoriasContenido.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Relación categorías-contenido no encontrada' });
        }
        return res.json({ mensaje: 'Relación categorías-contenido eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar relación categorías-contenido' });
    }
};

module.exports = {
    obtenerRelacionCategoriasContenido,
    crearRelacionCategoriasContenido,
    obtenerRelacionCategoriasContenidoPorId,
    actualizarRelacionCategoriasContenido,
    eliminarRelacionCategoriasContenido,
};