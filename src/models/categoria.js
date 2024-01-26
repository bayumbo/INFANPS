const categoria = (sequelize, type) => {
    return sequelize.define('categorias', {
        id_categoria: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_categoria: type.STRING,
            
        crearCategoria:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarCategoria:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
        
    }, {
        timestamps: false,
    });
};

module.exports = categoria;
