const orm = require('../Database/dataBase.orm');

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
        return res.redirect('/foros');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear gestión de contenido' });
    }
};

const obtenerForoPorId = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await orm.Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        return res.json({ foro });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener foro por ID' });
    }
};

const formularioForos = async(req, res) => {
    const { id } = req.params;
    try {
        const foro = await orm.Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        // Renderizar el formulario de edición con los datos del foro
        return res.render('editarForos', { foro });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al mostrar formulario de edición' });
    }
};

const actualizarForo = async(req, res) => {
    try {
        const { id } = req.params;
        // Buscar la información de seguridad a actualizar en la base de datos
        const foro = await orm.Foro.findByPk(id);
        if (!foro) {
            return res.status(404).json({ mensaje: 'Foro no encontrada' });
        }
        // Actualizar los campos de la información de seguridad con los datos enviados en la solicitud
        await foro.update(req.body);
        // Redirigir a la página de información de seguridad después de la actualización
        return res.redirect('/foros');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar el foro' });
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
    formularioForos,
    actualizarForo,
    eliminarForo,
};