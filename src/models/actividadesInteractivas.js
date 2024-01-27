const ActividadesInteractivas = (sequelize, type) => {
    return sequelize.define(
        "ActividadesInteractivas", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: type.STRING(255),
            tipo_actividad: type.STRING(50),
            contenido: type.TEXT,
            fecha_publicacion: type.DATE,
            id_autor: type.INTEGER,
        }, {
            timestamps: false,
        }
    );
};
module.exports = ActividadesInteractivas;