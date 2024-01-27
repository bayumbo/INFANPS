const { ActividadesInteractivas, Usuarios } = require('../models/actividadesInteractivas');

const obtenerActividadesInteractivas = async(req, res) => {
    try {
        const actividadesInteractivas = await ActividadesInteractivas.findAll();
        return res.json(actividadesInteractivas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener actividades interactivas' });
    }
};

const crearActividadInteractiva = async(req, res) => {
    try {
        const nuevaActividadInteractiva = await ActividadesInteractivas.create(req.body);
        return res.json(nuevaActividadInteractiva);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear actividad interactiva' });
    }
};

const obtenerActividadInteractivaPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const actividadInteractiva = await ActividadesInteractivas.findByPk(id);
        if (!actividadInteractiva) {
            return res.status(404).json({ mensaje: 'Actividad interactiva no encontrada' });
        }
        return res.json(actividadInteractiva);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener actividad interactiva por ID' });
    }
};

const actualizarActividadInteractiva = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [actividadInteractivaActualizada]] = await ActividadesInteractivas.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Actividad interactiva no encontrada' });
        }
        return res.json(actividadInteractivaActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar actividad interactiva' });
    }
};

const eliminarActividadInteractiva = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await ActividadesInteractivas.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Actividad interactiva no encontrada' });
        }
        return res.json({ mensaje: 'Actividad interactiva eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar actividad interactiva' });
    }
};

module.exports = {
    obtenerActividadesInteractivas,
    crearActividadInteractiva,
    obtenerActividadInteractivaPorId,
    actualizarActividadInteractiva,
    eliminarActividadInteractiva,
};