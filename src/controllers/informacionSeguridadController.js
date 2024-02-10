const orm = require('../Database/dataBase.orm');
const {enviarCorreoNotificacion} = require ('../controllers/notificacionesController');


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
        const {  titulo, contenido, comentario, fecha_publicacion, id_autor } = req.body;

        // Crear un nuevo foro
        const nuevaInformacionSeguridad = await InformacionSeguridad.create({
            titulo,
            contenido, 
            comentario,
            fecha_publicacion,
            id_autor,
        });

        const usuario = await Usuario.findByPk(id_autor);

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
        const asunto = 'Nueva información creada';
        const mensaje = `Se ha creado una nueva información: ${titulo}`;

        // Enviar notificación por correo
        await enviarCorreoNotificacion(usuario.correo, asunto, mensaje);
        
        return res.redirect('/informacion-seguridad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear información de seguridad' });
    }
};
const obtenerInformacionSeguridadPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const informacionSeguridad = await orm.InformacionSeguridad.findByPk(id);
        if (!informacionSeguridad) {
            return res.status(404).json({ mensaje: 'Información de seguridad no encontrada' });
        }
        // Renderizar la vista de edición con los datos de la información de seguridad
        res.render('editarInformacionSeguridad', { informacionSeguridad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener la información de seguridad para editar' });
    }
};


const actualizarInformacionSeguridad = async (req, res) => {
    const id = req.params.id
    const ids = req.user.id
    const {titulo, contenido, comentario, fecha_publicacion}= req.body
    const nuevo = {
        titulo,
        contenido,
        comentario,
        fecha_publicacion,
        id_autor: ids,
    }
    await orm.InformacionSeguridad.findOne({where: {id:id}})
    .then((anyname)=>{
        anyname.update(nuevo)
        req.redirect('/informacion-seguridad')
    })

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