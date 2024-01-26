const Usuario = (sequelize, type) => {
    return sequelize.define(
        "Usuario", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: type.STRING(100),
            correo: {
                type: type.STRING(100),
                unique: true,
            },
            contraseña: type.STRING(255),
            tipo_usuario: {
                type: type.ENUM('Padre', 'Educador', 'Ambos'),
                allowNull: false,
            },
            creacionUsuario: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            actualizarUsuario: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        }, {
            timestamps: false,
        }
    );
};
mdoule.exports = Usuario;