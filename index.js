import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//crear la app
const app = express()
//Habilitar lectura de formularios
app.use( express.urlencoded({extended: true}));
//conexión a la base de datos
const conectarDB = async () => {
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión correcta a la base de datos')
} catch (error){
    console.log(error)
}
}
conectarDB()
//Habilitar pug

app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Publica
app.use(express.static('public'))

//routing
app.use('/auth',usuarioRoutes)



//definir un puerto y arrancar el servidor
const port = 3000;
app.listen(port, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})