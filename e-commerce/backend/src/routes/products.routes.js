import { Router } from "express";
import { getProduct, getProductById, postProduct, putProductById, deleteProductById } from "../controllers/products.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router()

productRouter.get('/', getProduct)
productRouter.get('/:id', getProductById)
productRouter.post('/', passportError('jwt'), authorization('admin'), postProduct)
productRouter.put('/:id', passportError('jwt'), authorization('admin'), putProductById)
productRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProductById)

export default productRouter