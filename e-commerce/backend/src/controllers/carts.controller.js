import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

export const getCart = async (req,res) => {
    try{
        const carts = await cartModel.find()
        !carts 
        ? res.status(404).send({respuesta: 'error', mensaje: "Carrito no encontrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: carts})
    }catch(error){
        res.status(500).send({error: `Error al consultar carrito ${error}`})
    }
}

export const getCartById = async (req,res) => {
    const {id} = req.params
    try{
        const cart = await cartModel.findById(id)
        !cart 
        ? res.status(404).send({error: "Carrito no encontrado"}) 
        : res.status(200).send({respuesta: 'ok', mensaje: cart})
    }catch(error){
        res.status(500).send({error: `Error al consultar carrito ${error}`})
    }
}

export const postCart = async (req, res) => {

    try {
        const cart = await cartModel.create({})
        !cart
        ?res.status(404).send({error:"Error al crear Carrito"})
        :res.status(200).send({ respuesta: 'OK', mensaje: cart })
    } catch (error) {
        res.status(500).send({error: `Error al crear carrito ${error}`})
    }
}

export const deleteCart = async(req,res)=> {
    const {id} = req.params
    try{
        const cart = await cartModel.findById(id)
        !cart 
        ? res.status(404).send({error: "Carrito no encontrado"}) 
        : cart = cart.products[{}];
        res.status(200).send({respuesta: 'ok', mensaje: cart}) 
    }catch(error){
        res.status(500).send({error: `Error al eliminar carrito ${error}`})
    }
}

export const postProdCart = async (req,res) => {
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
                res.status(404).send({ error: 'Producto no encontrado' })
            }
        } else {
            res.status(404).send({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        res.status(500).send({ error: `Error en agregar producto Carrito ${error}` })
    }
}

export const putCartById = async (req, res) => {
    const { id } = req.params;
    const { arr } = req.body;

    try {
        const cart = await cartModel.findById(id);
        if (cart) {
            arr.forEach(async (element) => {
                const prod = cart.products.find((prod) => prod.id_prod === element.id_prod);
                !prod 
                ? cart.products.push(element)
                : prod.quantity = element.quantity 
                }
            );
            const respuesta = await cartModel.findByIdAndUpdate(id, cart);
            res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar carrito', mensaje: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).send({ respuesta: 'Error en actualizar carrito', mensaje: error });
    }
}


export const putProdCart = async (req,res) => {
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
                res.status(404).send({ error: 'Error en encotrar Producto' })
            }
        } else {
            res.status(404).send({ error: 'Error en encontrar Carrito' })
        }
    } catch (error) {
        res.status(500).send({ error: `Error en agregar producto Carrito ${error}` })
    }
}

export const putQuantityProdCart = async (req,res) => {
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
                res.status(404).send({ error: 'producto no encontrado' })
            }
        } else {
            res.status(404).send({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        res.status(500).send({ error: `Error en agregar producto Carrito ${error}` })
    }
}

export const deleteProdCart = async (req, res) => {
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
                    res.status(404).send({ error: 'Producto no encontrado' });
                }
            } else {
                res.status(404).send({ error: 'Producto no encontrado' });
            }
        } else {
            res.status(404).send({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar producto Carrito ${error}` });
    }
}