import { Router } from "express";
import { userModel } from "../models/users.models.js";

const userRouter = Router();

userRouter.get('/', async (req,res) => {
    try{
        const users = await userModel.find()
        res.status(200).send({respuesta: 'ok', mensaje: users})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})  

userRouter.get('/:id', async (req,res) => {
    const {id} = req.params
    try{
        const users = await userModel.findById(id)
        !users 
        ? res.status(404).send({respuesta: 'error', mensaje: "  User not found"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: users})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})


userRouter.put('/:id', async (req,res) => {
    const {id} = req.params
    const {last_name,first_name,age,email,password} = req.body
    try{
        const user = await userModel.findByIdAndUpdate(id, {last_name,first_name,age,email,password})
        !user 
        ? res.status(404).send({respuesta: 'error', mensaje: "  User not found"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: user})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

userRouter.delete('/:id', async (req,res) => {
    const {id} = req.params
    try{
        const user = await userModel.findByIdAndDelete(id)
        !user 
        ? res.status(404).send({respuesta: 'error', mensaje: "  User not found"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: user})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

export default userRouter