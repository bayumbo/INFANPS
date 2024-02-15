const { Op } = require('sequelize');
const { Foro, Usuario } = require('../Database/dataBase.orm');
const {enviarCorreoNotificacion} = require ('../controllers/notificacionesController');

const obtenerForos = async (req, res) => {
    try {
        const foros = await Foro.findAll();
        return res.render('foros', { foros });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foros' });
    }
};

const crearForo = async (req, res) => {
    try {
        
        const { titulo, contenido, campoAdicional, id_creador } = req.body;

        // Crear un nuevo foro
        const nuevoForo = await Foro.create({
            titulo,
            contenido, 
            campoAdicional, // Nuevo campo
            id_creador,
        });

        // Obtener el usuario para enviar la notificación
        const usuario = await Usuario.findByPk(id_creador);

        // Verificar si se encontró el usuario
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Acceder al correo electrónico del usuario
        const correoUsuario = usuario.correo;

        // Verificar si el usuario tiene un correo electrónico
        if (!correoUsuario) {
            console.error('Usuario sin dirección de correo electrónico');
            return res.status(500).json({ mensaje: 'Usuario sin dirección de correo electrónico' });
        }

        // Asunto y mensaje de la notificación
        const asunto = 'Nuevo foro creado';
        const mensaje = `Se ha creado un nuevo foro: ${titulo}`;

        // Enviar notificación por correo
        await enviarCorreoNotificacion(usuario.correo, asunto, mensaje);

        // Redireccionar o responder según sea necesario
        return res.redirect('/foros');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear foro desde la vista' });
    }
};

const obtenerForoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const foro = await Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.render('foros', { foro });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foro por ID' });
    }
};

const actualizarForo = async (req, res) => {
    try {
        const { id } = req.params;
        // Lógica para obtener el foro con el ID proporcionado desde la base de datos
        const foro = await Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }

        if (req.method === 'GET') {
            // Si la solicitud es GET, renderizar el formulario de edición
            return res.render('foros', { foro });
        } else if (req.method === 'PUT') {
            // Si la solicitud es PUT, actualizar el foro con los datos proporcionados
            const { titulo, descripcion, campoAdicional } = req.body;
            await Foro.update({ titulo, descripcion, campoAdicional }, { where: { id } });
            return res.redirect('/foros'); // Redireccionar a la página de foros después de la actualización
        } else {
            return res.status(405).json({ mensaje: 'Método HTTP no permitido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar foro' });
    }
};
const eliminarForo = async (req, res) => {
    const { id } = req.params;
    try {
        
        const filasEliminadas = await Foro.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.redirect('/foros');
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