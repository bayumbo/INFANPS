const CryptoJS = require('crypto-js')

const helpers = {}

helpers.encryptContraseña = async (contraseña) =>{
    const hash = CryptoJS.AES.encrypt(contraseña, 'secret').toString();
    return hash;
}

module.exports = helpers;