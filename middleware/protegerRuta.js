import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuarios.js';

const protegerRuta = async (req, res, next) => {
    const { _token } = req.cookies;

    if (!_token) {
        return res.redirect('/auth/login');
    }
    try {
        const verificarToken = jwt.verify(_token, process.env.JWT_SECRET);

        // Buscamos los usuarios
        const usuario = await Usuario.findByPk(verificarToken.id);

        if (!usuario) {
            return res.redirect('/auth/login');
        }

        // Guardamos el usuario en req
        req.usuario = usuario;

        return next();

    } catch (error) {
        console.log("JWT inválido o expirado:", error);
        return res.redirect('/auth/login');
    }
};

export default protegerRuta;