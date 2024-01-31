const { Perfil, Usuarios } = require('../Database/dataBase.orm');

const obtenerPerfiles = async(req, res) => {
    try {
        const perfiles = await Perfil.findAll();
        return res.json(perfiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener perfiles' });
    }
};

const crearPerfil = async(req, res) => {
    try {
        const nuevoPerfil = await Perfil.create(req.body);
        return res.json(nuevoPerfil);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear perfil' });
    }
};

const obtenerPerfilPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const perfil = await Perfil.findByPk(id);
        if (!perfil) {
            return res.status(404).json({ mensaje: 'Perfil no encontrado' });
        }
        return res.json(perfil);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener perfil por ID' });
    }
};

const actualizarPerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, perfilesActualizados] = await Perfil.update(req.body, { where: { id }, returning: true });

        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Perfil no encontrado' });
        }

        const perfilActualizado = perfilesActualizados[0];
        return res.json(perfilActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar perfil' });
    }
};

const eliminarPerfil = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Perfil.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Perfil no encontrado' });
        }
        return res.json({ mensaje: 'Perfil eliminado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar perfil' });
    }
};

module.exports = {
    obtenerPerfiles,
    crearPerfil,
    obtenerPerfilPorId,
    actualizarPerfil,
    eliminarPerfil,
};