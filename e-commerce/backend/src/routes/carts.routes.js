import { Router } from "express";
import { getCart, getCartById, postCart, deleteProdtsCart, putCartById, postProdCart, putProdCart, deleteProdCart, postTicket } from "../controllers/carts.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const cartRouter = Router()
cartRouter.get('/', getCart)
cartRouter.get('/:id', passportError('jwt'), authorization('user'), getCartById)
cartRouter.post('/', postCart)
cartRouter.delete('/:id', passportError('jwt'), authorization('user'), deleteProdtsCart)
cartRouter.put('/:id', passportError('jwt'), authorization('user'), putCartById)
cartRouter.post('/:cid/products/:pid', passportError('jwt'), authorization('user'), postProdCart)
cartRouter.put('/:cid/products/:pid', passportError('jwt'), authorization('user'), putProdCart)
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), authorization('user'), deleteProdCart);
cartRouter.post('/:cid/purchase', passportError('jwt'), authorization('user'), postTicket)


export default cartRouter