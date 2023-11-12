import { productModel } from "../models/products.models.js";

export const getProduct = async (req,res) => {
    const query = req.query.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    try{
        const prods = await productModel.paginate({query},{ limit, page, sort: { price: sort }})
        !prods 
        ? res.status(404).send({mensaje: "Productos no encontrados"})
        : res.status(200).send({respuesta: 'ok', mensaje: prods})
    }catch(error){
        res.status(500).send({mensaje:`Error en consultar productos ${error}`})
    }
}

export const getProductById = async (req,res) => {
    const {id} = req.params
    try{
        const prods = await productModel.findById(id)
        !prods 
        ? res.status(404).send({mensaje: "Producto no encontrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: prods})
    }catch(error){
        res.status(500).send({error:`Error en consultar producto ${error}`})
    }
}

export const postProduct = async (req,res) => {
    const {title, description, code, price, stock, category} = req.body
    try{
        const prod = await productModel.create({title, description, code, price, stock, category})
        !prod
        ? res.status(400).send({mensaje: "Error en crear Producto"})
        : res.status(201).send({respuesta: 'ok', mensaje: prod})
    }catch(error){
        error.code == 11000 // -El error code "11000" es de llave duplicada-
        ? res.status(400).send({mensaje: "Producto ya creado con llave duplicada"})
        : res.status(500).send({mensaje:`Error en crear Producto ${error}`})
    }
}
export const putProductById = async (req,res) => {
    const {id} = req.params
    const {title, description, code, price, status, stock, category} = req.body
    try{
        const prod = await productModel.findByIdAndUpdate(id, {title, description, code, price, status, stock, category})
        !prod 
        ? res.status(404).send({mensaje: "Producto no encontrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: prod})
    }catch(error){
        res.status(500).send({mensaje:`Error en actualizar producto ${error}`})
    }
}

export const deleteProductById = async (req,res) => {
    const {id} = req.params
    try{
        const prod = await productModel.findByIdAndDelete(id)
        !prod 
        ? res.status(404).send({mensaje: "Producto no encotrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: prod})
    }catch(error){
        res.status(500).send({mensaje:`Error en eliminar producto ${error}`})
    }
}