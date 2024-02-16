const {Router} = require('express');
const router = Router();


const {renderSignUpForm,renderSignInForm,signup,signin,logout} = require('../controllers/usuariosController');

//Registro de Usuarios
router.get('/users/signup',renderSignUpForm);
router.post('/users/signup',signup);

//Inicio de Sesión

router.get('/users/signin',renderSignInForm);
router.post('/users/signin',signin);

//Cerrar Sesión
router.get('/users/logout',logout);
module.exports = router;