import { check, validationResult } from "express-validator";
import Usuario from "../models/Usarios.js";
import { where } from "sequelize";

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        tituloPagina: "Inicio de Sesion",
    });
};

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        tituloPagina: "Registro de Usuario",
    });
};

const registrar = async (req, res) => {
    //Validaciones
    await check("nombre").notEmpty().withMessage("El nombre no puede estar vacio").run(req);
    await check("email").isEmail().withMessage("Esto no parece un correo").run(req);
    await check("password").isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres").run(req);
    await check("repeat_password").equals(req.body.password).withMessage("La contraseña no es igual").run(req);

    let resultado = validationResult(req);

    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro', {
            tituloPagina: "Registro de Usuario",
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            },
        });
    }

    //Extraer los datos
    const { nombre, email, password} = req.body;

    //Validar que el usuario no exista
    const existeUsuario = await Usuario.findOne({
        where: { email } // Busca un registro donde la columna 'email' sea igual al valor proporcionado
    });
    if(existeUsuario){
        return res.render('auth/registro', {
            tituloPagina: "Registro de Usuario",
            errores: [{msg: "El usuario ya existe"}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            },
        });
    }

    const usuarios = await Usuario.create(req.body); 
    res.json(req.body);
};

const formularioOlvidePassword = (req, res) => {
    res.render("auth/olvide-password", {
        tituloPagina: "Olvide Contraseña",
    });
};

export { formularioLogin, formularioRegistro, registrar, formularioOlvidePassword };