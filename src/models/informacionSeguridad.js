const { DataTypes } = require('sequelize');

const InformacionSeguridad = (sequelize) => {
    return sequelize.define(
        'InformacionSeguridad', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titulo: {
                type: DataTypes.STRING(255),
                allowNull: true, // O false dependiendo de tus requisitos
            },
            contenido: {
                type: DataTypes.STRING(255)  ,
                allowNull: true, // O false dependiendo de tus requisitos
            },
            comentario: {
                type: DataTypes.TEXT,
                allowNull: true, // O false dependiendo de tus requisitos
            },
            fecha_publicacion: {
                type: DataTypes.DATE,
                allowNull: true, // O false dependiendo de tus requisitos
            },
            // Definición de las relaciones
            id_autor: {
                type: DataTypes.INTEGER,
                allowNull: true, // O false dependiendo de tus requisitos
                references: {
                    model: 'Usuarios', // Reemplazar con el nombre real de tu tabla de usuarios
                    key: 'id', // Reemplazar con el nombre real de la clave primaria en la tabla de usuarios
                },
            },
        }, {
            timestamps: false,
        }
    );
};

module.exports = InformacionSeguridad;