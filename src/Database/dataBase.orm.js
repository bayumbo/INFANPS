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
const UsuarioModel = require('../models/usuarios');
const PerfilModel = require('../models/perfiles');
const InformacionSeguridadModel = require('../models/informacionSeguridad');
const ActividadesInteractivasModel = require('../models/actividadesInteractivas');
const ForoModel = require('../models/foros');
const MensajesForoModel = require('../models/mensajesForos');
const NotificacionModel = require('../models/notificaciones');
const GestionContenidoModel = require('../models/gestionContenidos');
const CategoriaModel = require('../models/categorias');
const RelacionCategoriasContenidoModel = require('../models/relacionCategoriasContenido');
const ProgramacionPublicacionModel = require('../models/programacionPublicacion');
const Categoria1Model = require('../models/categoria1');

//sincronia
const Usuario = UsuarioModel(sequelize, Sequelize);
const Perfil = PerfilModel(sequelize, Sequelize);
const InformacionSeguridad = InformacionSeguridadModel(sequelize, Sequelize);
const ActividadesInteractivas = ActividadesInteractivasModel(sequelize, Sequelize);
const Foro = ForoModel(sequelize, Sequelize);
const MensajesForo = MensajesForoModel(sequelize, Sequelize);
const Notificacion = NotificacionModel(sequelize, Sequelize);
const GestionContenido = GestionContenidoModel(sequelize, Sequelize);
const Categoria = CategoriaModel(sequelize, Sequelize);
const RelacionCategoriasContenido = RelacionCategoriasContenidoModel(sequelize, Sequelize);
const ProgramacionPublicacion = ProgramacionPublicacionModel(sequelize, Sequelize);
const Categoria1 = Categoria1Model(sequelize,Sequelize);


//relacion Adivinanza-Categoria

Usuario.hasOne(Perfil, { foreignKey: 'id_usuario' });
Perfil.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(Notificacion, { foreignKey: 'id_usuario' });
Notificacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(GestionContenido, { foreignKey: 'id_administrador' });
GestionContenido.belongsTo(Usuario, { foreignKey: 'id_administrador' });

Usuario.hasMany(InformacionSeguridad, { foreignKey: 'id_autor' });
InformacionSeguridad.belongsTo(Usuario, { foreignKey: 'id_autor' });

Usuario.hasMany(ActividadesInteractivas, { foreignKey: 'id_autor' });
ActividadesInteractivas.belongsTo(Usuario, { foreignKey: 'id_autor' });

Usuario.hasMany(Foro, { foreignKey: 'id_creador' });
Foro.belongsTo(Usuario, { foreignKey: 'id_creador' });

Usuario.hasMany(MensajesForo, { foreignKey: 'id_usuario' });
MensajesForo.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Foro.hasMany(MensajesForo, { foreignKey: 'id_foro' });
MensajesForo.belongsTo(Foro, { foreignKey: 'id_foro' });

GestionContenido.hasMany(RelacionCategoriasContenido, { foreignKey: 'id_contenido' });
RelacionCategoriasContenido.belongsTo(GestionContenido, { foreignKey: 'id_contenido' });

Categoria.hasMany(RelacionCategoriasContenido, { foreignKey: 'id_categoria' });
RelacionCategoriasContenido.belongsTo(Categoria, { foreignKey: 'id_categoria' });

GestionContenido.hasMany(ProgramacionPublicacion, { foreignKey: 'id_contenido' });
ProgramacionPublicacion.belongsTo(GestionContenido, { foreignKey: 'id_contenido' });

InformacionSeguridad.hasMany(Categoria1, { foreignKey: 'id_informacion_seguridad' });
Categoria1.belongsTo(InformacionSeguridad, { foreignKey: 'id_informacion_seguridad' });

Foro.belongsToMany(Categoria, {
    through: 'RelacionCategoriasContenido',
    foreignKey: 'id_contenido',
    uniqueConstraint: {
        name: 'Foro_Categoria_unique',
        message: 'La relación ya existe'
    }
});

ActividadesInteractivas.belongsToMany(Categoria, {
    through: 'RelacionCategoriasContenido',
    foreignKey: 'id_contenido',
    uniqueConstraint: {
        name: 'ActividadesInteractivas_Categoria_unique',
        message: 'La relación ya existe'
    } 
});

InformacionSeguridad.belongsToMany(Categoria, {
    through: 'RelacionCategoriasContenido', 
    foreignKey: 'id_contenido',
    uniqueConstraint: {
        name: 'InformacionSeguridad_Categoria_unique',
        message: 'La relación ya existe'
    }
});


module.exports = {
    Usuario,
    Perfil,
    InformacionSeguridad,
    ActividadesInteractivas,
    Foro,
    MensajesForo,
    Notificacion,
    GestionContenido,
    Categoria,
    RelacionCategoriasContenido,
    ProgramacionPublicacion,
    Categoria1,

};

