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
        return res.json(foros)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foros' });
    }
};

const crearCategoriaForo = async(req, res) => {
    try {

        const { titulo, contenido, campoAdicional, id_creador } = req.body;

        // Crear un nuevo foro
        const nuevoForo = await orm.Foro.create({
            titulo,
            contenido,
            campoAdicional, // Nuevo campo
            id_creador,
        });

        // Obtener el usuario para enviar la notificació

        return res.redirect('/gestion-contenidos/foro');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear foro desde la vista' });
    }
};

const obtenerContenidoForoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await orm.Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        render('gestionForo', { foro })
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