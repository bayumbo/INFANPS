// models/gestionContenidos.js
// models/gestionContenido.js
const GestionContenido = (sequelize, type) => {
    return sequelize.define('GestionContenido', {
        id_contenido: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: type.STRING(255),
        tipo_contenido: type.STRING(50),
        contenido: type.TEXT,
        fecha_publicacion: type.DATE,
        id_autor: type.INTEGER,
        categoria: type.STRING, // Nuevo campo para la categoría
    }, {
        timestamps: false,
    });
};

module.exports = GestionContenido;