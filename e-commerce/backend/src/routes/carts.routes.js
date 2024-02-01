import { Router } from "express";
import { getCart, getCartById, postCart, deleteProdtsCart, putCartById, postProdCart, putProdCart, deleteProdCart, postTicket } from "../controllers/carts.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";


const cartRouter = Router()
cartRouter.get('/', getCart)
cartRouter.get('/:id', passportError('jwt'), authorization('user'), authorization('admin'), getCartById)
cartRouter.post('/', postCart)
cartRouter.delete('/:id', passportError('jwt'), authorization('user'), authorization('admin'), deleteProdtsCart)
cartRouter.put('/:id', passportError('jwt'), authorization('user'), authorization('admin'), putCartById)
cartRouter.post('/:cid/products/:pid', passportError('jwt'), authorization('user'), authorization('admin'), postProdCart)
cartRouter.put('/:cid/products/:pid', passportError('jwt'), authorization('user'), authorization('admin'), putProdCart)
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), authorization('user'), authorization('admin'), deleteProdCart);
cartRouter.post('/:cid/purchase', passportError('jwt'), authorization('user'), authorization('admin'), postTicket)


export default cartRouter