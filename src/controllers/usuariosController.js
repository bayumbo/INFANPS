const usersCtrl = {};
const passport = require('passport');
const bcrypt = require('bcrypt');
const pool = require("../Database/dataBase.sql");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const { nombre, correo, contraseña, confirm_contraseña } = req.body;
    const errors = [];

    if (contraseña !== confirm_contraseña) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }

    if (contraseña.length < 4) {
        errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            nombre,
            correo,
            contraseña,
            confirm_contraseña,
        });
    } else {
        try {

            // Verificar si el correo electrónico ya está en uso
            const existingUser = pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

            if (existingUser.length > 0) {
                errors.push({ text: 'El correo electrónico ya está registrado' });


                res.render('users/signup', {
                    errors,
                    nombre,
                    correo,
                    contraseña,
                    confirm_contraseña,
                });
            } else {
                // Cifrar la contraseña
                const hashedContraseña = await bcrypt.hash(contraseña, 4);

                // Guardar el usuario en la base de datos
                const query = 'INSERT INTO usuarios(nombre, correo, contraseña) VALUES (?, ?, ?)';
                pool.query(query, [nombre, correo, hashedContraseña]);
                req.flash('success_msg', 'Usuario creado exitosamente');
                res.redirect('/users/signin');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el usuario');
        }
    }
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
        failureRedirect: '/users/signin',
        successRedirect: '/',
        failureFlash: true
    });


usersCtrl.logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al cerrar la sesión');
        }
        req.flash('success', 'Sesión cerrada exitosamente');
        res.redirect('/users/signin');
      });
};
module.exports = usersCtrl;