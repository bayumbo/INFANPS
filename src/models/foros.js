const Foro = (sequelize, type) => {
    return sequelize.define(
        "Foro", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: type.STRING(255),
            descripcion: type.TEXT,
            id_creador: type.INTEGER,
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
module.exports = Foro;