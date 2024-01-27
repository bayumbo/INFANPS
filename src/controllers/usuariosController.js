const { Usuarios } = require('../models/usuarios');

const obtenerUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        return res.json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

const crearUsuario = async(req, res) => {
    try {
        const nuevoUsuario = await Usuarios.create(req.body);
        return res.json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};

const obtenerUsuarioPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener usuario por ID' });
    }
};

const actualizarUsuario = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [usuarioActualizado]] = await Usuarios.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
};

const eliminarUsuario = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await Usuarios.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        return res.json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
};