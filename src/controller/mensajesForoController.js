const { MensajesForo, Foros, Usuarios } = require('../models');

const obtenerMensajesForo = async(req, res) => {
    try {
        const mensajesForo = await MensajesForo.findAll();
        return res.json(mensajesForo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener mensajes de foro' });
    }
};

const crearMensajeForo = async(req, res) => {
    try {
        const nuevoMensajeForo = await MensajesForo.create(req.body);
        return res.json(nuevoMensajeForo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear mensaje de foro' });
    }
};

const obtenerMensajeForoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const mensajeForo = await MensajesForo.findByPk(id);
        if (!mensajeForo) {
            return res.status(404).json({ mensaje: 'Mensaje de foro no encontrado' });
        }
        return res.json(mensajeForo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener mensaje de foro por ID' });
    }
};

const actualizarMensajeForo = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [mensajeForoActualizado]] = await MensajesForo.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Mensaje de foro no encontrado' });
        }
        return res.json(mensajeForoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar mensaje de foro' });
    }
};

const eliminarMensajeForo = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await MensajesForo.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Mensaje de foro no encontrado' });
        }
        return res.json({ mensaje: 'Mensaje de foro eliminado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar mensaje de foro' });
    }
};

module.exports = {
    obtenerMensajesForo,
    crearMensajeForo,
    obtenerMensajeForoPorId,
    actualizarMensajeForo,
    eliminarMensajeForo,
};