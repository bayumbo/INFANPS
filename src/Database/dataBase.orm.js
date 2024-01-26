const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        }
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });


	const adivinanzaModel = require('../models/adivinanza') 
	const categoriaModel = require('../models/categoria') 

    //sincronia
	
	const adivinanza = adivinanzaModel(sequelize, Sequelize)
	const categoria = categoriaModel(sequelize, Sequelize)
	
    //relacion Adivinanza-Categoria
	categoria.hasMany(adivinanza)
	adivinanza.belongsTo(categoria)

    module.exports = {
		adivinanza,
		categoria
	};
	
// Exportar el objeto sequelize
module.exports = sequelize;