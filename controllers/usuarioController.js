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
const formularioOlvidePassword= (req,res) => {
    res.render('auth/olvide-password', {
        pagina: 'Retrieve your account to PARSETHAT!'
    })
}


export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword
}