const { Foros, Usuarios } = require('../models');

const obtenerForos = async(req, res) => {
    try {
        const foros = await Foros.findAll();
        return res.json(foros);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foros' });
    }
};

const crearForo = async(req, res) => {
    try {
        const nuevoForo = await Foros.create(req.body);
        return res.json(nuevoForo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear foro' });
    }
};

const obtenerForoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await Foros.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.json(foro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foro por ID' });
    }
};

const actualizarForo = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [foroActualizado]] = await Foros.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.json(foroActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar foro' });
    }
};

const eliminarForo = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Foros.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.json({ mensaje: 'Foro eliminado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar foro' });
    }
};

module.exports = {
    obtenerForos,
    crearForo,
    obtenerForoPorId,
    actualizarForo,
    eliminarForo,
};