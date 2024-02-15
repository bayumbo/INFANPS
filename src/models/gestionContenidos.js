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
        categoria: type.STRING(255), // Campo para la categoría
        archivo_multimedia: {
            type: type.STRING(255), // Tipo de dato para la ruta del archivo multimedia
            allowNull: true, // Permite que el campo sea nulo
        },
    }, {
        timestamps: false,
    });
};

module.exports = GestionContenido;