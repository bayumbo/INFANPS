const {Router} = require('express');
const router = Router();

const {renderIndex,renderLogin,renderBienvenida} = require('../controllers/indexController.js');

const {isAuthenticated} = require('../lib/auth.js');

router.get('/',renderIndex );
router.get('/login',renderLogin);
router.post('/bienvenida',isAuthenticated,renderBienvenida)


module.exports = router;