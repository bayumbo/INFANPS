const Categoria = (sequelize, type) => {
    return sequelize.define(
        "Categoria", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: type.STRING(50),
        }, {
            timestamps: false,
        }
    );
};

module.exports = Categoria;