const MensajesForo = (sequelize, type) => {
    return sequelize.define(
        "MensajesForo", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_foro: type.INTEGER,
            id_usuario: type.INTEGER,
            mensaje: type.TEXT,
            fecha_creacion: {
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        }, {
            timestamps: false,
        }
    );
};
module.exports = MensajesForo;