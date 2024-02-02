import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/tickets.models.js";
import { userModel } from "../models/users.models.js";
// import CustomError from "../services/errors/customErrors.js";
// import NErrors from "../services/errors/enums.js";

export const getCart = async (req, res) => {
  try {
    const carts = await cartModel.find();
    !carts
      ? res
          .status(404)
          .send({ respuesta: "error", mensaje: "Carrito no encontrado" })
      : res.status(200).send({ respuesta: "ok", mensaje: carts });
  } catch (error) {
    res.status(500).send({ error: `Error al consultar carrito ${error}` });
  }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartModel.findById(id);
    !cart
      ? res.status(404).send({ error: "Carrito no encontrado" })
      : res.status(200).send({ respuesta: "ok", mensaje: cart });
  } catch (error) {
    res.status(500).send({ error: `Error al consultar carrito ${error}` });
  }
};

export const postCart = async (req, res) => {
  try {
    const cart = await cartModel.create({});
    !cart
      ? res.status(404).send({ error: "Error al crear Carrito" })
      : res.status(200).send({ respuesta: "OK", mensaje: cart });
  } catch (error) {
    res.status(500).send({ error: `Error al crear carrito ${error}` });
  }
};

export const deleteProdtsCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartModel.findById(id);
    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado" });
    } else {
      cart.products = []
      await cartModel.findByIdAndUpdate(id, cart);
      res.status(200).send({ respuesta: "ok", mensaje: cart });
    }
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar carrito ${error}` });
  }
};

export const putCartById = async (req, res) => {
  const { id } = req.params;
  const arr = req.body;
  const err = false;
  try {
    const cart = await cartModel.findById(id);
    if (cart) {
      for (const prod of arr) {
        if (prod.quantity < 1 || prod.quantity === undefined) {
          err = true;
          break;
        } else {
          const pid = prod.productId;
          const ok = await productModel.findById(pid);
          if (ok) {
            const indexProd = cart.products.findIndex(
              (product) => product.id_prod._id.toString() === prod.productId
            );
            indexProd === -1
              ? cart.products.push({
                  id_prod: prod.productId,
                  quantity: prod.quantity,
                })
              : (cart.products[indexProd].quantity = prod.quantity);
          } else {
            res
              .status(404)
              .send(`Error en encontrar el Producto ${prod.productId}`);
            break;
          }
        }
      }
      if (err !== true) {
        await cartModel.findByIdAndUpdate(id, cart);
        res
          .status(200)
          .send({ respuesta: "Productos actualizados", mensaje: cart });
      } else {
        res.status(400).send({
          respuesta: `La cantidad del producto ${prod.productId} no es valida`,
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar carrito",
        mensaje: "Cart not found",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ respuesta: "Error en actualizar carrito", mensaje: error });
  }
};

export const postProdCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (quantity < 1 || quantity === undefined) {
    res.status(400).send({ respuesta: `La cantidad no es valida` });
  } else {
    try {
      const cart = await cartModel.findById(cid);
      if (cart) {
        const prod = await productModel.findById(pid);
        if (prod) {
          const index = cart.products.findIndex(
            (product) => product.id_prod._id.toString() == pid
          );
          if (index != -1) {
            cart.products[index].quantity += quantity;
          } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
          }
          const newProdInCart = await cartModel.findByIdAndUpdate(cid, cart);
          res
            .status(201)
            .send({ respuesta: "Producto Agregado", mensaje: newProdInCart });
        } else {
          res.status(404).send({ respuesta: "Producto no encontrado" });
        }
      } else {
        res.status(404).send({ respuesta: "Carrito no encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: `Error en agregar producto Carrito ${error}` });
    }
  }
};

export const putProdCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);
      if (prod) {
        const index = cart.products.findIndex(
          (product) => product.id_prod._id.toString() == pid
        );
        if (index != -1) cart.products[index].quantity = quantity;
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({ error: "Error en encotrar Producto" });
      }
    } else {
      res.status(404).send({ error: "Error en encontrar Carrito" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: `Error en agregar producto Carrito ${error}` });
  }
};

export const deleteProdCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);
      if (prod) {
        const index = cart.products.findIndex(
          (item) => item.id_prod._id.toString() == pid
        );
        if (index !== -1) {
          cart.products.splice(index, 1);
          const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
          res.status(200).send({ respuesta: "OK", mensaje: respuesta });
        } else {
          res.status(404).send({ error: "Producto no encontrado" });
        }
      } else {
        res.status(404).send({ error: "Producto no encontrado" });
      }
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: `Error en eliminar producto Carrito ${error}` });
  }
};

export const postTicket = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      try {
        let totalAmount = 0;
        let countProds = cart.products.length;
        let prods = 0;
        let prodsUpdate = {};
        for (const product of cart.products) {
          let idProd = product.id_prod._id.toString();
          let prod = await productModel.findById(idProd);
          if (prod.stock >= product.quantity) {
            totalAmount += product.quantity * prod.price;
            let newStock = prod.stock - product.quantity;
            prodsUpdate[idProd] = newStock;
            prods++;
          } else {
            await cartModel.deleteProdCart(cid, idProd);
            res.status(400).send({ error: "No hay stock suficiente" });
            break;
          }
        }
        const user = await userModel.findOne({ cart: cid });
        const email = user.email;
        if (prods === countProds) {
          if (user.rol === "premium") totalAmount * 0.9;
          const ticket = await ticketModel.create({
            amount: totalAmount,
            purchaser: email,
          });
          if (ticket) {
            for (const idProd in prodsUpdate) {
              await productModel.findByIdAndUpdate(idProd, {
                stock: prodsUpdate[idProd],
              });
            }
            await cartModel.deleteProdtsCart(cid);
            res.status(200).send({ mensaje: "Compra Finalizada" });
          }
        }
      } catch (error) {
        res.status(500).send({ error: `Error al crear Ticket ${error}` });
      }
    }
  } catch (error) {
    res.status(500).send({ error: `Error al encontrar el Carrito ${error}` });
  }
};
