const { Usuario, Perfil, Notificacion, GestionContenido } = require('../models');

const obtenerUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

const crearUsuario = async(req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        return res.json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};

const actualizarUsuario = async(req, res) => {
    const { id } = req.params;
    try {
        const usuarioActualizado = await Usuario.update(req.body, { where: { id } });
        return res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
};

const eliminarUsuario = async(req, res) => {
    const { id } = req.params;
    try {
        await Usuario.destroy({ where: { id } });
        return res.json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
};