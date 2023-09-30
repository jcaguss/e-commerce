import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router()

sessionRouter.post('/login', async (req,res) => {
    const {email, password} = req.body
    try{
        if(req.session.login){
            res.status(200).send({respuesta:'Login ya existente'})
        }
        const user = await userModel.findOne({email:email})
        if(user){
            if(user.password == password){
                req.session.login = true
                // res.status(200).send({resultado: 'Login valido', message: user})
                res.redirect("/realTimeProducts", 200, { "info": "user" })
            }else{
                res.status(401).send({resultado: 'Contraseña no valida', message: password})
            }
        } else {
            res.status(404).send({resultado: 'Not found', message: 'error'})
        }
    }catch(error){
        res.send(400).send({error:`Error en login ${error}`})
    }
})

sessionRouter.get('/logaut', (req,res)=>{
    if(req.session.login){
        req.session.destroy()
    }
    res.redirect("/login", 200, {resultado: 'Usuario deslogueado'})
})


export default sessionRouter;