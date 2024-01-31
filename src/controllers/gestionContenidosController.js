const { GestionContenido, Usuarios } = require('../Database/dataBase.orm');

const obtenerGestionContenidos = async(req, res) => {
    try {
        const gestionContenidos = await GestionContenido.findAll();
        return res.json(gestionContenidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener gestión de contenidos' });
    }
};

const crearGestionContenido = async(req, res) => {
    try {
        const nuevoGestionContenido = await GestionContenido.create(req.body);
        return res.json(nuevoGestionContenido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear gestión de contenido' });
    }
};

const obtenerGestionContenidoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const gestionContenido = await GestionContenido.findByPk(id);
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
        const [filasActualizadas, gestionContenidoActualizados] = await GestionContenido.update(req.body, { where: { id }, returning: true });

        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Gestion de contenido no encontrado' });
        }

        const gestionContenidoActualizado = gestionContenidoActualizados[0];
        return res.json(gestionContenidoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar perfil'  });    
    }
};

const eliminarGestionContenido = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await GestionContenido.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Gestión de contenido no encontrada' });
        }
        return res.json({ mensaje: 'Gestión de contenido eliminada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar gestión de contenido' });
    }

};
const holaMundo = (req, res) => {
    res.render('holamundo', { mensaje: '¡Hola mundo!' }); // Asegúrate de tener una vista llamada 'hola-mundo.hbs'
};
module.exports = {
    obtenerGestionContenidos,
    crearGestionContenido,
    obtenerGestionContenidoPorId,
    actualizarGestionContenido,
    eliminarGestionContenido,
    holaMundo,
};