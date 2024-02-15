const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');

// Importar módulos locales
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT } = require('./keys');
require('./lib/passport');

// Crear aplicación Express
const app = express();
const port = 3000;

// Configurar almacenamiento de sesiones
const options = {
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    createDatabaseTable: true,
};
const sessionStore = new MySQLStore(options);

// Configurar Handlebars
const handlebars = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    },
});

// Configurar motor de vistas
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Configurar middleware
app.use(fileUpload({ createParentPath: true }));
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
    session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'Lax',
        },
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

// Configurar variables globales
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

app.use(helmet());

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const informacionSeguridadRoutes = require('./routes/informacionSeguridadRoutes');
const gestionContenidosRoutes = require('./routes/gestionContenidosRoutes');
const actividadesInteractivasRoutes = require('./routes/actividadesInteractivasRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const forosRoutes = require('./routes/forosRoutes');
const mensajesForoRoutes = require('./routes/mensajesForoRoutes');
const perfilesRoutes = require('./routes/perfilesRoutes');
const programacionPublicacionRoutes = require('./routes/programacionPublicacionRoutes');
const relacionCategoriasContenidoRoutes = require('./routes/relacionCategoriasContenidoRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const categoria1Routes = require('./routes/categoria1Routes');

// Configurar rutas
app.use(informacionSeguridadRoutes);
app.use(gestionContenidosRoutes);
app.use(usuariosRoutes);
app.use(actividadesInteractivasRoutes);
app.use(categoriasRoutes);
app.use(forosRoutes);
app.use(mensajesForoRoutes);
app.use(perfilesRoutes);
app.use(programacionPublicacionRoutes);
app.use(relacionCategoriasContenidoRoutes);
app.use(categoria1Routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Exportar la aplicación
module.exports = app;