import { generateToken } from '../utils/jwt.js'
import { userModel } from '../models/users.models.js'

export const login = async (req,res) => {
    try{
        if(!req.user){
            return res.status(401).send({mensaje: 'Usuario invalido'})
        }
        const id = req.user._id.toString()
        await userModel.findOneAndUpdate({_id: id}, {last_connection: Date.now()});
        //Si siguen con sesiones en BDD, esto no se borra. Si usan JWT SI 
        //req.session.user = {
        //     first_name: req.user.first_name,
        //     last_name: req.user.last_name,
        //     age: req.user.age,
        //     email: req.user.email
        // }
        //res.status(200).send({mensaje: 'Usuario logueado'})
        const token = generateToken(req.user)
        
        res.status(200).send({ token })
    }catch(error){
        res.status(500).send({mensaje: `Error al iniciar sesion ${error}`})
    }
}

export const register = async (req,res) => {
    try{
        if(!req.user){
            return res.status(400).send({mensaje: 'Usuario ya existente'})
        }
        res.status(200).send({payload: 'Usuario registrado'})
    }catch(error){
        res.status(500).send({mensaje: `Error al registrar usuario ${error}`})
    }
}

export const getGitHubRegister = async (req,res) => {
    res.redirect('/login', 200, {mensaje: 'Usuario registrado'})
}

export const getGitHubLogin = async (req,res) => {
    req.session.user = req.user
    // res.status(200).send({mensaje: 'Usuario logueado'})
    res.redirect('/products', 200, {mensaje: 'Usuario logueado'})
}

export const getLogaut = async (req,res)=>{
    //Si manejo sesiones en BDD
    // if(req.session.login){
    //     req.session.destroy()
    // }
    const email = req.body.email
    await userModel.findOneAndUpdate({email: email}, {last_connection: Date.now()});
    res.clearCookie('jwtCookie')
    res.redirect("/login", 200, {resultado: 'Usuario deslogueado'})
}

export const getCurrent = (req,res) => {
    res.send(req.user)
}
