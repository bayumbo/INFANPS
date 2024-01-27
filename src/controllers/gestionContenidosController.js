const { GestionContenidos, Usuarios } = require('../models/gestionContenidos');

const obtenerGestionContenidos = async(req, res) => {
    try {
        const gestionContenidos = await GestionContenidos.findAll();
        return res.json(gestionContenidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener gestión de contenidos' });
    }
};

const crearGestionContenido = async(req, res) => {
    try {
        const nuevoGestionContenido = await GestionContenidos.create(req.body);
        return res.json(nuevoGestionContenido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear gestión de contenido' });
    }
};

const obtenerGestionContenidoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const gestionContenido = await GestionContenidos.findByPk(id);
        if (!gestionContenido) {
            return res.status(404).json({ mensaje: 'Gestión de contenido no encontrada' });
        }
        return res.json(gestionContenido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener gestión de contenido por ID' });
    }
};

const actualizarGestionContenido = async(req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas, [gestionContenidoActualizado]] = await GestionContenidos.update(req.body, { where: { id }, returning: true });
        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Gestión de contenido no encontrada' });
        }
        return res.json(gestionContenidoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar gestión de contenido' });
    }
};

const eliminarGestionContenido = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await GestionContenidos.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Gestión de contenido no encontrada' });
        }
        return res.json({ mensaje: 'Gestión de contenido eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar gestión de contenido' });
    }
};

module.exports = {
    obtenerGestionContenidos,
    crearGestionContenido,
    obtenerGestionContenidoPorId,
    actualizarGestionContenido,
    eliminarGestionContenido,
};