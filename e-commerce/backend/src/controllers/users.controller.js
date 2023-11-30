import { userModel } from "../models/users.models.js";
import CustomError from "../services/errors/customErrors.js";
import NErrors from "../services/errors/enums.js";
import { generateUserInfo } from "../services/errors/UserInfo.js";

export const getUsers = async (req,res) => {
    try{
        const users = await userModel.find()
        res.status(200).send({respuesta: 'ok', mensaje: users})
    }catch(error){
        res.status(500).send({error: `Error al consultar usuarios ${error}`})
    }
}

export const getUserById = async (req,res) => {
    const {id} = req.params
    try{
        const users = await userModel.findById(id)
        !users 
        ? res.status(404).send({error: "Usuario no encontrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: users})
    }catch(error){
        res.status(500).send({error: `Error al consultar usuarios ${error}`})
    }
}


export const putUserById = async (req,res) => {
    const {id} = req.params
    const {first_name,last_name,age,email,password} = req.body
    try{
        if(!first_name || !last_name || !age || !email || !password){
            CustomError.createError({
                name: "Error al actualizar Usuario",
                cause: generateUserInfo({first_name,last_name,age,email,password}),
                message: "Error al tratar de actualizar Usuario",
                code: NErrors.INVALID_TYPE_ERROR
            })
        }
        const user = await userModel.findByIdAndUpdate(id, {last_name,first_name,age,email,password})
        !user 
        ? res.status(404).send({error: "Usuario no encontrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: user})
    }catch(error){
        res.status(500).send({ error: error.code, mensaje:error })
    }
}

export const deleteUserById = async (req,res) => {
    const {id} = req.params
    try{
        const user = await userModel.findByIdAndDelete(id)
        !user 
        ? res.status(404).send({respuesta: 'error', mensaje: "  User not found"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: user})
    }catch(error){
        res.status(400).send({error: `Error en Eliminar Usuario ${error}`})
    }
}