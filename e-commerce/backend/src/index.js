import "dotenv/config";
import express from "express";
// import nodemailer from "nodemailer";
import cors from "cors";
import compression from "express-compression";
import mongoose from "mongoose";
import { addLogger } from "./config/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.js";
import session from "express-session";
import router from "./routes/index.routes.js";
import MongoStore from "connect-mongo";
// import { engine } from "express-handlebars";
// import { Server } from "socket.io";
import { __dirname } from "./path.js";
import path from "path";


const whiteList = ["http://localhost:5174"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
};

// ---- Server ----
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
// ---------  Nodemailer  ---------

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "jcaceresm1999@gmail.com",
//     pass: process.env.PASSWORD_EMAIL,
//     authMethod: "LOGIN",
//   },
// });

// app.get("/mail", async (req, res) => {
//   const respuesta = await transporter.sendMail({
//     from: "TEST MAIL jcaceresm1999@gmail.com",
//     to: "jcaceresm1999@gmail.com",
//     subject: "Hola, buenas tardes",
//     html: `
//             <div>
//                 <h1>Mi Primer Mail</h1>
//             </div>
//         `,
//     attachments: [
//       {
//         filename: "msRobot.jpg",
//         path: __dirname + "/img/msRobot.jpg",
//         cid: "msRobot.jpg",
//       },
//     ],
//   });
//   console.log(respuesta);
//   res.send("Email enviado");
// });

//---------

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion del curso de Backend",
      description: "Api Coder Backend",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`], //** indica una subcarpeta que no importa el nombre, *. no interesa el nombre si la extencion
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// ---- BBD ----
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD conectada");
    // const res = await cartModel.findOne({_id:'64ff5f57ddf4e37b81ab3de0'})
    // console.log(JSON.stringify(res))
  })
  .catch(() => console.log("error en conectar en BDD"));

// ---- Middlewares ----
app.use(cors(corsOptions));
//----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//----------------
app.set("views", path.resolve(__dirname, "./views")); //Path
//----------------
// app.use('/login', express.static(path.join(__dirname, "/public")))
//-------compression---------
app.use(
  compression({
    brotli: { endeble: true, zlib: {} },
  })
);
//----------------
app.use(cookieParser(process.env.SIGNED_COOKIE)); // Firma Cookie
//------sessions-------
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//----- Passport -----
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//----- Rutas -----
app.use("/", router);

//----- Loggers -----
app.use(addLogger);
//---------------------------
app.get("/info", (req, res) => {
  req.logger.info(
    '<span style="color:blue">Texto informativo de Info</span><br/>'
  );
  res.send("info");
});

app.get("/warning", (req, res) => {
  req.logger.warning('<span style="color:cyan">Texto Warning</span><br/>');
  res.send("warning");
});

app.get("/error", (req, res) => {
  req.logger.error('<span style="color:yellow">Texto Error</span><br/>');
  res.send("error");
});

app.get("/fatal", (req, res) => {
  req.logger.fatal(
    '<span style="color:red">Texto Fatal</span><br/>'
  );
  res.send("fatal");
});

app.get("/testArtillery", (req, res) => {
  res.send("Hola desde Artillery");
});

// ---- Server socket.io ----

// const io = new Server(server)
// const mensajes = []
// io.on('connection', (socket) => {
//     console.log("Servidor Socket.io conectado")
//     socket.on('mensajeConexion', (user) => {
//         if (user.rol === "Admin") {
//             socket.emit('credencialesConexion', "Usuario valido")
//         } else {
//             socket.emit('credencialesConexion', "Usuario no valido")
//         }
//     })

//     socket.on('mensaje', (infoMensaje) => {
//         console.log(infoMensaje)
//         mensajes.push(infoMensaje)
//         socket.emit('mensajes', mensajes)
//     })
// })

// app.get('/chat', (req, res) => {
//     res.render('chat', {
//         css: "style.css",
//         title: "Chats",
//         js: "chat.js"
//     })
// })
