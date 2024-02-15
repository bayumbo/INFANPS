const RelacionCategoriasContenido = (sequelize, type) => {
    return sequelize.define(
        'RelacionCategoriasContenido', {
            id_relacion: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_contenido: type.INTEGER,
            id_categoria: type.INTEGER,
        }, {
            timestamps: false,
        }
    );
};

module.exports = RelacionCategoriasContenido; 