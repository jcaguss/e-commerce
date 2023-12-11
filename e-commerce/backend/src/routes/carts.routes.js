import { Router } from "express";
import { getCart, getCartById, postCart, deleteProdtsCart, putCartById, postProdCart, putProdCart, deleteProdCart, posttTicket } from "../controllers/carts.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const cartRouter = Router()
cartRouter.get('/', getCart)
cartRouter.get('/:id', getCartById)
cartRouter.post('/', postCart)
cartRouter.delete('/:id', deleteProdtsCart)
cartRouter.put('/:id', putCartById)
cartRouter.post('/:cid/products/:pid', postProdCart)
cartRouter.put('/:cid/products/:pid', putProdCart)
cartRouter.delete('/:cid/products/:pid', deleteProdCart);
cartRouter.post('/:cid/purchase',posttTicket)


export default cartRouter