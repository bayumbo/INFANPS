const registerCtl = {};
const passport = require("passport");
const CryptoJS = require("crypto-js");

const { descifrarDatos } = require("../lib/encrypDates"); // Asume que existe un archivo de ayuda con funciones como descifrarDatos

registerCtl.showRegister = async (req, res) => {
    const usuario = await sql.query('select COUNT(*) AS total from users');
    if (usuario[0].total === 0) {
        res.render("login/register");
    } else {
        res.redirect('/');
    }
};

registerCtl.register = passport.authenticate("local.signup", {
    successRedirect: "/logout",
    failureRedirect: "/register",
    failureFlash: true,
});

registerCtl.showLogin = async (req, res) => {
    try {
        const ids = req.params.id;
        const Usuario = await sql.query('select * from users where idUsers = ?', [ids]);
        const username = await descifrarDatos(Usuario[0].usernameUser);
        Usuario[0].usernameUser = username;
        res.render('login/Login', { Usuario });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.redirect('/');
    }
};

registerCtl.login = passport.authenticate("local.signin", {
    successRedirect: "/generalList/",
    failureRedirect: "/",
    failureFlash: true,
});

registerCtl.showProfile = async (req, res) => {
    try {
        const id = req.user.idUser;
        const list = await sql.query("select * from datosCompletos where idUser = ?", [id]);

        // Desglosar la lógica de desencriptación
        const decryptedList = await decryptUserData(list[0]);

        res.render("login/perfil", { list: decryptedList });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.redirect('/');
    }
};

registerCtl.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Cerrada la Sesión con éxito.");
        res.redirect("/");
    });
};

module.exports = registerCtl;
