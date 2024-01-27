const { ProgramacionPublicacion, GestionContenidos } = require('../models/programacionPublicacion');

const obtenerProgramacionPublicaciones = async(req, res) => {
    try {
        const programacionPublicaciones = await ProgramacionPublicacion.findAll();
        return res.json(programacionPublicaciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener programación de publicaciones' });
    }
};

const crearProgramacionPublicacion = async(req, res) => {
    try {
        const nuevaProgramacionPublicacion = await ProgramacionPublicacion.create(req.body);
        return res.json(nuevaProgramacionPublicacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear programación de publicación' });
    }
};

const obtenerProgramacionPublicacionPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const programacionPublicacion = await ProgramacionPublicacion.findByPk(id);
        if (!programacionPublicacion) {
            return res.status(404).json({ mensaje: 'Programación de publicación no encontrada' });
        }
        return res.json(programacionPublicacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener programación de publicación por ID' });
    }
};

const actualizarProgramacionPublicacion = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [programacionPublicacionActualizada]] = await ProgramacionPublicacion.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Programación de publicación no encontrada' });
        }
        return res.json(programacionPublicacionActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar programación de publicación' });
    }
};

const eliminarProgramacionPublicacion = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await ProgramacionPublicacion.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Programación de publicación no encontrada' });
        }
        return res.json({ mensaje: 'Programación de publicación eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar programación de publicación' });
    }
};

module.exports = {
    obtenerProgramacionPublicaciones,
    crearProgramacionPublicacion,
    obtenerProgramacionPublicacionPorId,
    actualizarProgramacionPublicacion,
    eliminarProgramacionPublicacion,
};