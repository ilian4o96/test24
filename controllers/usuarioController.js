import { check, validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js"
import { generarID } from '../helpers/tokens.js'

const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina: 'login'
    })
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}
const registrar = async (req, res) => {
    //Validación de registro de cuenta 
    await check('nombre').notEmpty().withMessage('El campo "nombre" debe estar rellenado').run(req)
    await check('email').isEmail().withMessage('El campo "email" debe estar rellenado').run(req)
    await check('password').isLength({min: 6}).withMessage('La contraseña debe contener almenos 6 caracteres').run(req)
    await check('repetir_Password').equals('password').withMessage('La contraseña no coincide').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado esta vacio

    if(!resultado.isEmpty()){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    //Extraer los datos

    const { nombre, email , password } = req.body

    //verificar que el usuario no este duplicado

    const existeUsuario = await Usuario.findOne({ where : { email }})
    // SI no se extraen los datos previamente se puede usar: const existeUsuario = await Usuario.findOne({ where : { email : req.body.email }})
    if(existeUsuario){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El usuario ya está registrado'}],
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    // Guardar usuario en BBDD

   await Usuario.create({
    nombre,
    email,
    password,
    token:generarID()
   })

   //Mostrar mensaje de confirmación
   res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    mensaje: 'hemos enviado un email de confirmación a tu correo'
   })
}
const formularioOlvidePassword= (req,res) => {
    res.render('auth/olvide-password', {
        pagina: 'Retrieve your account to PARSETHAT!'
    })
}


export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}