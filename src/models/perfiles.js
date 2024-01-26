const Perfil = (sequelize, type) => {
    return sequelize.define(
        "Perfil", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_usuario: type.INTEGER,
            nombre_perfil: type.STRING(50),
            descripcion_perfil: type.TEXT,
            creacionPerfil: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            actualizarPerfil: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        }, {
            timestamps: false,
        }
    );
};

module.exports = Perfil;