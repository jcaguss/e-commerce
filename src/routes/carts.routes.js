import { Router } from "express";
import {cartModel} from "../models/carts.models.js"
import { productModel } from "../models/products.models.js";

const cartRouter = Router()

cartRouter.get('/', async(req,res)=> {
    try{
        const carts = await cartModel.find()
        !carts ? res.status(404).send({respuesta: 'error', mensaje: "  Cart not found"}) : res.status(200).send({respuesta: 'ok', mensaje: carts})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

cartRouter.get('/:id', async(req,res)=> {
    const {id} = req.params
    try{
        const cart = await cartModel.findById(id)
        !cart 
        ? res.status(404).send({respuesta: 'error', mensaje: "  Cart not found"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: cart})
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})

cartRouter.post('/', async (req, res) => {

    try {
        const cart = await cartModel.create({})
        res.status(200).send({ respuesta: 'OK', mensaje: cart })
    } catch (error) {
        res.status(400).send({ respuesta: 'error', mensaje: error })
    }
})

cartRouter.delete('/:id', async(req,res)=> {
    const {id} = req.params
    try{
        const cart = await cartModel.findById(id)
        !cart 
        ? res.status(404).send({respuesta: 'error', mensaje: "Cart not found"}) 
        : cart = cart.products[{}];
        res.status(404).send({respuesta: 'ok', mensaje: cart}) 
    }catch(error){
        res.status(400).send({respuesta: 'error', mensaje: error})
    }
})


cartRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { arr } = req.body;

    try {
        const cart = await cartModel.findById(id);
        if (cart) {
            arr.forEach(async (element) => {
                const prod = cart.products.find((prod) => prod.id_prod === element.id_prod);
                prod ? prod.quantity = element.quantity
                : cart.products.push(element);
                }
            );
            const respuesta = await cartModel.findByIdAndUpdate(id, cart);
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar carrito', mensaje: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar carrito', mensaje: error });
    }
});

cartRouter.put('/:cid/products/:pid', async (req,res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod == pid)
                if (index != -1) cart.products[index].quantity = quantity
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart Not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
})

cartRouter.post('/:cid/products/:pid', async (req,res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid)
            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod == pid)
                if (index != -1) {
                    cart.products[index].quantity = quantity
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity })
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart Not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid);
            if (prod) {
                const index = cart.products.findIndex(item => item.id_prod == pid);
                
                if (index !== -1) {
                    cart.products.splice(index, 1);
                    const respuesta = await cartModel.findByIdAndUpdate(cid, cart);                    
                    res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
                } else {
                    res.status(404).send({ respuesta: 'Error en eliminar producto Carrito', mensaje: 'Produt Not Found' });
                }
            } else {
                res.status(404).send({ respuesta: 'Error en eliminar producto Carrito', mensaje: 'Produt Not Found' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar producto Carrito', mensaje: 'Cart Not Found' });
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto Carrito', mensaje: error });
    }
});
export default cartRouter