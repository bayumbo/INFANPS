const adivinanza = (sequelize, type) => {
    return sequelize.define('adivinanzas', {
        id_adivinanza: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        pregunta_adivinanza:  type.STRING,
        respuesta_adivinanza: type.STRING,
           
        crearAdividanza:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarAdivinanza:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
        
    }, {
        timestamps: false,
    });
};

module.exports = adivinanza;
