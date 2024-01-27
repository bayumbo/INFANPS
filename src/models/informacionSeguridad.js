const InformacionSeguridad = (sequelize, type) => {
    return sequelize.define(
        "InformacionSeguridad", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: type.STRING(255),
            contenido: type.TEXT,
            fecha_publicacion: type.DATE,
            id_autor: type.INTEGER,
        }, {
            timestamps: false,
        }
    );
};
module.exports = InformacionSeguridad;