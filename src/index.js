import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.routes.js"
import productRouter from "./routes/products.routes.js";
import cartRouter from './routes/carts.routes.js'
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import  path  from "path";
import { cartModel } from "./models/carts.models.js";

const app = express();
const PORT = 8080;


const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
app.use('/realTimeProducts', express.static(path.join(__dirname, "/public")))
app.use('/chat', express.static(path.join(__dirname, "/public")))


mongoose.connect("mongodb+srv://JCAguss:<password>@cluster0.zeqxg3a.mongodb.net/?retryWrites=true&w=majority")
.then(async() => {
    console.log('BDD conectada')
    const res = await cartModel.findOne({_id:'64ff5f57ddf4e37b81ab3de0'})
    console.log(JSON.stringify(res))
})
.catch(()=>console.log("error en conectar en BDD"))

//Server socket.io

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

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

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
