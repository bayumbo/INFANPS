const { InformacionSeguridad, Usuarios } = require('../Database/dataBase.orm');

const obtenerInformacionSeguridad = async(req, res) => {
    try {
        const informacionSeguridad = await InformacionSeguridad.findAll();
        return res.json(informacionSeguridad);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de seguridad' });
    }
};

const crearInformacionSeguridad = async(req, res) => {
    try {
        const nuevaInformacionSeguridad = await InformacionSeguridad.create(req.body);
        return res.json(nuevaInformacionSeguridad);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear información de seguridad' });
    }
};

const obtenerInformacionSeguridadPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const informacionSeguridad = await InformacionSeguridad.findByPk(id);
        if (!informacionSeguridad) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        return res.json(informacionSeguridad);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de seguridad por ID' });
    }
};

const actualizarInformacionSeguridad = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [informacionSeguridadActualizada]] = await InformacionSeguridad.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        return res.json(informacionSeguridadActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'informacion seguridad  actualizado' });
    }
};

const eliminarInformacionSeguridad = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await InformacionSeguridad.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        return res.json({ mensaje: 'Información de seguridad eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar información de seguridad' });
    }
};

module.exports = {
    obtenerInformacionSeguridad,
    crearInformacionSeguridad,
    obtenerInformacionSeguridadPorId,
    actualizarInformacionSeguridad,
    eliminarInformacionSeguridad,
};
