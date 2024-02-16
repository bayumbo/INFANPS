const orm = require('../Database/dataBase.orm');
const { enviarCorreoNotificacion } = require('../controllers/notificacionesController');

const obtenerGestionCategoria = async(req, res) => {
    try {
        const gestion = await orm.GestionContenido.findAll();
        return res.render('seleccion', { gestion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener Gestion contenidos' });
    }
};


const obtenerContenidoForo = async(req, res) => {
    try {
        const foros = await orm.Foro.findAll();
        return res.render('gestionForo', { foros })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foros' });
    }
};

const crearCategoriaForo = async(req, res) => {
    try {
        const { titulo, contenido, fechaPublicacion } = req.body;
        let archivoMultimedia;

        // Verificar si se ha subido un archivo multimedia
        if (req.file) {
            archivoMultimedia = req.file.path; // Ruta del archivo multimedia en el servidor
        }

        // Crear el contenido en GestionContenido
        const nuevoContenido = await orm.Foro.create({
            titulo,
            contenido,
            archivo_multimedia: archivoMultimedia,
            fecha_publicacion: fechaPublicacion // Se pasa la fecha de publicación del contenido
        });

        // Redireccionar a la página de gestión de contenidos
        return res.redirect('/gestion-contenidos/foro');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear gestión de contenido' });
    }
};



const obtenerContenidoForoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await orm.Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        render('actividades', { foro })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foro por ID' });
    }
};

const actualizarForo = async(req, res) => {
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
const eliminarForo = async(req, res) => {
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
    obtenerContenidoForo,
    obtenerGestionCategoria,
    crearCategoriaForo,
    obtenerContenidoForoPorId
};