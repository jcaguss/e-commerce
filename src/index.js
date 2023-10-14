import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.js'
import session from 'express-session';
import router from './routes/index.routes.js';
import MongoStore from 'connect-mongo';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import  path  from "path";
import { cartModel } from "./models/carts.models.js";

// ---- Server ----
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// ---- Middlewares ----
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
//----------------
app.engine("handlebars", engine()) // img
//----------------
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))//Path
//----------------
app.use('/login', express.static(path.join(__dirname, "/public")))
app.use('/realTimeProducts', express.static(path.join(__dirname, "/public")))
app.use('/chat', express.static(path.join(__dirname, "/public")))
//----------------
app.use(cookieParser(process.env.SIGNED_COOKIE)) // Firma Cookie
//----------------
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
//----- Passport -----
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//----- Rutas -----
app.use('/', router)

// // ---- Verificion de Usuario Admin ----
// const auth = (req,res,next) => {
//     if(req.session.email == 'admin@admin.com' && res.session.password == '1234'){
//         return next()
//     }
//     res.send("No tienes acceso a esta Ruta")
// }

// ---- BBD ----
mongoose.connect(process.env.MONGO_URL)
.then(async() => {
    console.log('BDD conectada')
    const res = await cartModel.findOne({_id:'64ff5f57ddf4e37b81ab3de0'})
    console.log(JSON.stringify(res))
})
.catch(()=>console.log("error en conectar en BDD"))




// ---- Server socket.io ----

const io = new Server(server)
const mensajes = []
const prods = []
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit('credencialesConexion', "Usuario valido")
        } else {
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })

    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        socket.emit('mensajes', mensajes)
    })

    socket.on('nuevoProducto', (nuevoProd) => {
        prods.push(nuevoProd)
        socket.emit('prods', prods)
    })
})


// app.get('setCookie',(req,res)=>{
//     res.cookie('CookieCookie','Esto es una cookie',{ maxAge:10000, signed: true }).send('Cookie generada')
// })


// app.get('getCookie',(req,res)=>{
//     res.send(req.signedCookies)
// })

// app.get('/session', (req,res) => {
//     if(req.session.counter){
//         req.session.counter++
//         res.send(`Ingreso ${req.session.counter} veces`)
//     } else {
//         req.session.counter = 1
//         res.send("Ingreso por Primera vez")
//     }
// })



// app.get('/admin', (req,res)=>{
//     res.send('Soy Admin')
// })


app.get('/login',(req,res)=>{
    res.render('login',{
        css: 'login.css',
        title: "login-e-commerce",
        js: "login.js"
    })
})

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Products",
        js: "realTimeProducts.js"
    })
})
app.get('/chat', (req, res) => {
    res.render('chat', {
        css: "style.css",
        title: "Chats",
        js: "chat.js"
    })
})
