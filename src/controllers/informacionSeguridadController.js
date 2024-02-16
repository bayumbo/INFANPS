const orm = require('../Database/dataBase.orm');

const obtenerInformacion = async(req, res) => {
    try {
        const informacion = await orm.InformacionSeguridad.findAll();
        return res.render('informacion', { informacion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foros' });
    }
};

const crearInformacion = async(req, res) => {
    try {
        const { titulo, contenido, fechaPublicacion } = req.body;
        let archivoMultimedia;

        // Verificar si se ha subido un archivo multimedia
        if (req.file) {
            archivoMultimedia = req.file.path; // Ruta del archivo multimedia en el servidor
        }

        // Crear el contenido en GestionContenido
        const nuevoContenido = await orm.InformacionSeguridad.create({
            titulo,
            contenido,
            archivo_multimedia: archivoMultimedia,
            fecha_publicacion: fechaPublicacion // Se pasa la fecha de publicación del contenido
        });

        // Redireccionar a la página de gestión de contenidos
        return res.redirect('/informacion-seguridad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear gestión de contenido' });
    }
};

const obtenerInformacionPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const informacion = await orm.InformacionSeguridad.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Informacion seguridad no encontrada' });
        }
        return res.json({ informacion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foro por ID' });
    }
};

const formularioInformacion = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await orm.InformacionSeguridad.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        // Renderizar el formulario de edición con los datos del foro
        return res.render('editarInformacion', { foro });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al mostrar formulario de edición' });
    }
};

const actualizarInformacion = async(req, res) => {
    try {
        const { id } = req.params;
        const { titulo, contenido, archivoMultimedia, fechaPublicacion } = req.body;
        const informacion = await orm.InformacionSeguridad.findByPk(id);
        if (!informacion) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }

        // Actualizar el foro con los datos proporcionados
        await orm.InformacionSeguridad.update({ titulo, contenido, archivoMultimedia, fechaPublicacion }, { where: { id } });

        // Redireccionar a la página de foros después de la actualización
        return res.redirect('/informacion-seguridad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar foro' });
    }
};

const eliminarInformacion = async(req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await orm.InformacionSeguridad.destroy({ where: { id } });
        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.redirect('/informacion-seguridad');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar foro' });
    }
};

module.exports = {
    obtenerInformacion,
    crearInformacion,
    obtenerInformacionPorId,
    formularioInformacion,
    actualizarInformacion,
    eliminarInformacion,
};