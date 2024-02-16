const orm = require('../Database/dataBase.orm');
const { enviarCorreoNotificacion } = require('../controllers/notificacionesController');

const obtenerForos = async(req, res) => {
    try {
        const foros = await orm.Foro.findAll();
        return res.render('foros', { foros });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foros' });
    }
};

const crearForo = async(req, res) => {
    try {

        const { titulo, contenido } = req.body;

        // Crear un nuevo foro
        const nuevoForo = await orm.Foro.create({
            titulo,
            contenido,

        });

        return res.redirect('/foros');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear foro desde la vista' });
    }
};

const obtenerForoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await orm.Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.render('editarForos', { foro });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foro por ID' });
    }
};

const actualizarForo = async(req, res) => {
    const { id } = req.params;
    console.log('ID del foro:', id)
    try {

        const { titulo, contenido, campoAdicional } = req.body;

        // Actualizar el foro con los nuevos valores
        const resultado = await orm.Foro.update({
            titulo,
            contenido,
            campoAdicional
        }, { where: { id } });

        if (resultado === 0) {
            // Si no se actualizó ninguna fila, el foro no se encontró
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }

        // Si se actualizó correctamente, redireccionar a la página de foros
        return res.redirect('/foros');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar foro desde la vista' });
    }
};

const eliminarForo = async(req, res) => {
    const { id } = req.params;
    try {

        const filasEliminadas = await orm.Foro.destroy({ where: { id } });
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