const Categoria1 = (sequelize, DataTypes) => {
    const Categoria1Model = sequelize.define('Categoria1', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        multimedia_tipo_contenido: DataTypes.ENUM('imagen', 'video', 'link', 'documento'),
        multimedia_descripcion: DataTypes.TEXT,
        multimedia_url: DataTypes.STRING(255),
        id_informacion_seguridad: {
            type: DataTypes.INTEGER,
            references: {
                model: 'informacionseguridads', // Reemplazar con el nombre real de tu tabla de InformacionSeguridad
                key: 'id', // Reemplazar con el nombre real de la clave primaria en la tabla de InformacionSeguridad
            },
        },
    }, {
        timestamps: false,
    });

    return Categoria1Model;
};

module.exports = Categoria1;