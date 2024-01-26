const ProgramacionPublicacion = (sequelize, type) => {
    return sequelize.define(
        "ProgramacionPublicacion", {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_contenido: type.INTEGER,
            fecha_programada: type.DATE,
        }, {
            timestamps: false,
        }
    );
};

module.exports = ProgramacionPublicacion;