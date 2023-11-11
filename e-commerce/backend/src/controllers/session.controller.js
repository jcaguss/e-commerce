import { generateToken } from '../utils/jwt.js'

export const postLogin = async (req,res) => {
    try{
        if(!req.user){
            return res.status(401).send({mensaje: 'Usuario invalido'})
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        const token = generateToken(req.user)
        res.status(200).send({token})
        //res.redirect('/realTimeProducts', 200, {token})
    }catch(error){
        res.status(500).send({mensaje: `Error al iniciar sesion ${error}`})
    }
}

export const postRegister = async (req,res) => {
    try{
        if(!req.user){
            return res.status(400).send({mensaje: 'Usuario ya existente'})
        }
        res.status(200).send({payload: 'Usuario registrado'})
        //res.redirect('/login', 200, {payload: 'Usuario registrado'})
    }catch(error){
        res.status(500).send({mensaje: `Error al registrar usuario ${error}`})
    }
}

export const getGitHubRegister = async (req,res) => {
    res.redirect('/login', 200, {mensaje: 'Usuario registrado'})
}

export const getGitHubLogin = async (req,res) => {
    req.session.user = req.user
    res.status(200).send({mensaje: 'Usuario logueado'})
    //res.redirect('/realTimeProducts', 200, {mensaje: 'Usuario logueado'})
}

export const getLogaut = (req,res)=>{
    if(req.session.login){
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    res.redirect("/login", 200, {resultado: 'Usuario deslogueado'})
}

export const getTestJWT = (req,res) => {
    res.send(req.user)
}

export const getCurrent = (req,res) => {
    res.send(req.user)
}
