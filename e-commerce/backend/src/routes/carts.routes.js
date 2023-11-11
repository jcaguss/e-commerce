import { Router } from "express";
import { getCart, getCartById, postCart, deleteCart, putCartById, postProdCart, putProdCart, putQuantityProdCart, deleteProdCart } from "../controllers/carts.controller.js";

const cartRouter = Router()
cartRouter.get('/', getCart)
cartRouter.get('/:id', getCartById)
cartRouter.post('/', postCart)
cartRouter.delete('/:id', deleteCart)
cartRouter.put('/:id', putCartById)
cartRouter.put('/:cid/products/:pid', putQuantityProdCart)
cartRouter.post('/:cid/products/:pid', postProdCart)
cartRouter.delete('/:cid/products/:pid', deleteProdCart);

export default cartRouter