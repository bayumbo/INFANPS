const { Op } = require('sequelize');
const { GestionContenido, Foro, ActividadesInteractivas, InformacionSeguridad, RelacionCategoriasContenido } = require('../Database/dataBase.orm');
// Función auxiliar para obtener el modelo de la categoría
const obtenerModeloCategoria = (categoria) => {
    switch (categoria) {
        case 'Foros':
            return Foro;
        case 'Actividades Interactivas':
            return ActividadesInteractivas;
        case 'Información de Seguridad':
            return InformacionSeguridad;
        default:
            throw new Error('Categoría no válida');
    }
};

const obtenerGestionContenido = async(req, res) => {
    try {
        const gestionContenido = await GestionContenido.findAll();
        return res.render('gestionContenido', { gestionContenido });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener gestión de contenidos' });
    }
};

const crearGestionContenido = async(req, res) => {
    try {
        const { titulo, contenido, categoria, fechaPublicacion } = req.body;
        let archivoMultimedia;

        // Verificar si se ha subido un archivo multimedia
        if (req.file) {
            archivoMultimedia = req.file.path; // Ruta del archivo multimedia en el servidor
        }

        // Obtener el modelo de la categoría
        const categoriaModel = obtenerModeloCategoria(categoria);

        // Crear el contenido en GestionContenido
        const nuevoContenido = await GestionContenido.create({
            titulo,
            contenido,
            archivo_multimedia: archivoMultimedia,
            fecha_publicacion: fechaPublicacion // Se pasa la fecha de publicación del contenido
        });

        // Crear el contenido en la tabla de la categoría correspondiente
        await categoriaModel.create({
            ...nuevoContenido.dataValues // Se pasan todos los campos y sus valores
        });

        // Crear la relación en RelacionCategoriasContenido
        await RelacionCategoriasContenido.create({
            id_contenido: nuevoContenido.id_contenido,
            id_categoria: categoriaModel.id_categoria,
        });

        return res.redirect('/gestion-contenidos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al crear gestión de contenido' });
    }
};


const obtenerGestionContenidoPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const gestionContenido = await GestionContenido.findByPk(id);
        if (!gestionContenido) {
            return res.status(404).json({ mensaje: 'Contenido no encontrado' });
        }
        return res.render('detalleGestionContenido', { gestionContenido });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener gestión de contenido por ID' });
    }
};

const actualizarGestionContenido = async(req, res) => {
    try {
        const { id } = req.params;
        const { titulo, contenido, categoria } = req.body;

        // Verificar si el contenido existe
        const gestionContenido = await GestionContenido.findByPk(id);
        if (!gestionContenido) {
            return res.status(404).json({ mensaje: 'Contenido no encontrado' });
        }

        // Actualizar el contenido
        await gestionContenido.update({ titulo, contenido });

        // Obtener el modelo de la categoría
        const categoriaModel = obtenerModeloCategoria(categoria);

        // Actualizar la relación en RelacionCategoriasContenido
        await RelacionCategoriasContenido.update({ id_categoria: categoriaModel.id }, { where: { id_contenido: id } });

        return res.redirect('/gestion-contenidos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar gestión de contenido' });
    }
};

const eliminarGestionContenido = async(req, res) => {
    try {
        const { id } = req.params;

        // Eliminar la relación en RelacionCategoriasContenido
        await RelacionCategoriasContenido.destroy({
            where: { id_contenido: id },
        });

        // Eliminar el contenido
        await GestionContenido.destroy({
            where: { id },
        });

        return res.redirect('/gestion-contenidos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al eliminar gestión de contenido' });
    }
};

module.exports = {
    obtenerGestionContenido,
    crearGestionContenido,
    obtenerGestionContenidoPorId,
    actualizarGestionContenido,
    eliminarGestionContenido,
};