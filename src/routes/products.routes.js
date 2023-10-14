import { Router } from "express";
import { productModel } from "../models/products.models.js";
import { passportError, authorization } from "../utils/messagesError.js";


const productRouter = Router()

productRouter.get('/',async (req,res) => {
    const query = req.query.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    try{
        const prods = await productModel.paginate({query},{ limit, page, sort: { price: sort }})
        res.status(200).send({respuesta: 'ok', mensaje: prods})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

productRouter.get('/:id', async (req,res) => {
    const {id} = req.params
    try{
        const prods = await productModel.findById(id)
        !prods ? res.status(404).send({respuesta: 'error', mensaje: "  Product not found"}) : res.status(200).send({respuesta: 'ok', mensaje: prods})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

productRouter.post('/', passportError('jwt'), authorization('Admin'),async (req,res) => {
    const {title, description, code, price, stock, category} = req.body
    try{
        const prod = await productModel.create({title, description, code, price, stock, category})
        res.status(200).send({respuesta: 'ok', mensaje: prod})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

productRouter.put('/:id', async (req,res) => {
    const {id} = req.params
    const {title, description, code, price, status, stock, category} = req.body
    try{
        const prod = await productModel.findByIdAndUpdate(id, {title, description, code, price, status, stock, category})
        !prod ? res.status(404).send({respuesta: 'error', mensaje: "Product not found"}) : res.status(200).send({respuesta: 'ok', mensaje: prod})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

productRouter.delete('/:id', async (req,res) => {
    const {id} = req.params
    try{
        const prod = await productModel.findByIdAndDelete(id)
        !prod ? res.status(404).send({respuesta: 'error', mensaje: "Product not found"}) : res.status(200).send({respuesta: 'ok', mensaje: prod})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

export default productRouter