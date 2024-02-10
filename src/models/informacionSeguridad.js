const { DataTypes } = require('sequelize');

const InformacionSeguridad = (sequelize) => {
    return sequelize.define(
        'informacionSeguridad', {
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
                type: DataTypes. TEXT,
                allowNull: true, // O false dependiendo de tus requisitos
            },
            fecha_publicacion: {
                type: DataTypes.DATE,
                allowNull: true, // O false dependiendo de tus requisitos
            },
            id_autor: {
                type: DataTypes.INTEGER,
                allowNull: true, // O false dependiendo de tus requisitos
                references: {
                    model: 'usuarios', // Reemplazar con el nombre real de tu tabla de usuarios
                    key: 'id', // Reemplazar con el nombre real de la clave primaria en la tabla de usuarios
                },
            },
            id_informacion_seguridad: {
                type: DataTypes.INTEGER,
                allowNull: true, // O true dependiendo de tus requisitos.................................................
                references: {
                    model: 'InformacionSeguridads', // Reemplazar con el nombre real de tu tabla de InformacionSeguridad
                    key: 'id', // Reemplazar con el nombre real de la clave primaria en la tabla de InformacionSeguridad
                },
            },
            
        }, {
            timestamps: false,
        }
    );
};

module.exports = InformacionSeguridad;
