const { InformacionSeguridad, Usuarios } = require('../Database/dataBase.orm');

const obtenerInformacionSeguridad = async (req, res) => {
    try {
        const informacionSeguridad = await InformacionSeguridad.findAll();
        return res.render('informacionSeguridad', { informacionSeguridad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de seguridad' });
    }
};


const crearInformacionSeguridad = async (req, res) => {
    try {
        const informacionSeguridad = await InformacionSeguridad.create(req.body);
        return res.redirect('/informacion-seguridad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear información de seguridad' });
    }
};

const obtenerInformacionSeguridadPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const informacionSeguridad = await InformacionSeguridad.findByPk(id);
        if (!informacionSeguridad) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        return res.render('detalleInformacionSeguridad', { informacionSeguridad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de seguridad por ID' });
    }
};


const actualizarInformacionSeguridad = async (req, res) => {
    const { id } = req.body; // Asegúrate de enviar el ID desde el formulario de edición
    try {
        // Actualizar la información de seguridad en la base de datos
        const [filasActualizadas, [informacionSeguridadActualizada]] = await InformacionSeguridad.update(req.body, { where: { id }, returning: true });

        // Redirigir a la pantalla principal o a la entrada actualizada
        return res.redirect('/informacion-seguridad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar información de seguridad' });
    }
};

const eliminarInformacionSeguridad = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await InformacionSeguridad.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }

        return res.redirect('/informacion-seguridad');
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