import { productModel } from "../models/products.models.js";
import NErrors from "../services/errors/enums.js";
import { generateProductInfo } from "../services/errors/ProductInfo.js";
import CustomError from "../services/errors/customErrors.js";

export const postProducts = async (req,res) => {
    const prods = req.body
    const productosCreados = []
    const errors = []
    for (const p of prods){
        const {title, description, code, price, stock, category} = p
        if(!title || !description || !code || !price || !stock || !category){
            errors.push(CustomError.createError({
                name: "Error al crear Producto",
                cause: generateProductInfo({title, description, code, price, stock, category}),
                message: "Error al tratar de crear un Producto",
                code: NErrors.INVALID_TYPE_ERROR
            }))
        }
        try{
            const prod = await productModel.create({title, description, code, price, stock, category})
            productosCreados.push(prod)
        }catch(error){
        error.code == 11000 // -El error code "11000" es de llave duplicada-
        ? errors.push({mensaje: "Producto ya creado con llave duplicada", error:error.keyValue})
        : errors.push({ error: error.code, mensaje:error })
        }        
    }
    errors.length>0
    ? res.status(400).send({mensaje: "Hubo errores al crear algunos productos", errores: errors})
    : res.status(201).send({respuesta: 'ok', mensaje: "Productos creados", productos: createdProducts})
}