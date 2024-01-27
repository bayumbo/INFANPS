const { Notificaciones, Usuarios } = require('../models/notificaciones');

const obtenerNotificaciones = async(req, res) => {
    try {
        const notificaciones = await Notificaciones.findAll();
        return res.json(notificaciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener notificaciones' });
    }
};

const crearNotificacion = async(req, res) => {
    try {
        const nuevaNotificacion = await Notificaciones.create(req.body);
        return res.json(nuevaNotificacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear notificación' });
    }
};

const obtenerNotificacionPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const notificacion = await Notificaciones.findByPk(id);
        if (!notificacion) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada' });
        }
        return res.json(notificacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener notificación por ID' });
    }
};

const actualizarNotificacion = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [notificacionActualizada]] = await Notificaciones.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada' });
        }
        return res.json(notificacionActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar notificación' });
    }
};

const eliminarNotificacion = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Notificaciones.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada' });
        }
        return res.json({ mensaje: 'Notificación eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar notificación' });
    }
};

module.exports = {
    obtenerNotificaciones,
    crearNotificacion,
    obtenerNotificacionPorId,
    actualizarNotificacion,
    eliminarNotificacion,
};