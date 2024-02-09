const { Notificaciones } = require('../Database/dataBase.orm');
const nodemailer = require('nodemailer');
const { Usuario } = require('../Database/dataBase.orm'); 



const enviarCorreoNotificacion = async (usuarioEmail, asunto, mensaje) => {
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bth4rts@gmail.com',
                pass: 'kttvmaunbeovxzvt',
            },
        });

        
        const htmlMensaje = `
            <html>
                <head>
                    <title>${asunto}</title>
                </head>
                <body>
                    <h1>${asunto}</h1>
                    <p>${mensaje}</p>
                    <p>Gracias,</p>
                    <p>INFANPS</p>
                </body>
            </html>
        `;

        // Configurar opciones del correo electrónico
        const mailOptions = {
            from: 'bth4rts@gmail.com',
            to: usuarioEmail,
            subject: asunto,
            html: htmlMensaje,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
            } else {
                console.log('Correo enviado con éxito:', info.response);
            }
        });
        // Enviar el correo electrónico
        const info = await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado con éxito:', info);

        return info;  // Devuelve la información del envío para su manejo
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error; // Propaga el error para que pueda ser manejado en el controlador principal
    }
};

const notificarCambio = async (req, res) => {
    try {
        // Obtener el correo del usuario 
        const usuario = await Usuario.findByPk(req.user.id);

        // Asunto y mensaje de la notificación
        const asunto = 'Cambio en la página web';
        const mensaje = 'Se ha realizado un cambio en la página web.';

        // Enviar notificación por correo
        const infoEnvio = await enviarCorreoNotificacion(usuario.email, asunto, mensaje);

        // Verificar el resultado del envío
        if (infoEnvio && infoEnvio.accepted.length > 0) {
            console.log('Correo enviado a:', infoEnvio.accepted);
            return res.json({ mensaje: 'Notificación enviada con éxito' });
        } else {
            console.error('Error al enviar el correo electrónico');
            return res.status(500).json({ mensaje: 'Error al enviar la notificación por correo' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al enviar la notificación por correo' });
    }
};
module.exports = {
    notificarCambio,
    enviarCorreoNotificacion,
};