const Categorias = (sequelize, type) => {
    return sequelize.define(
        'Categoria', {
            id_categoria: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: type.STRING,
        }, {
            timestamps: false,
        }
    );
};

module.exports = Categorias;