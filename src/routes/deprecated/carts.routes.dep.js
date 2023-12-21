import { Router } from 'express';
import Cart from '../../class/Cart.js';
import { prodManager, cartsManager } from '../../server.js';

const cartRouter = Router();
const path = '/';

const infoStatus = { status: 'Error', info: '' };

//POST createCart
cartRouter.post(path, (req, res) => {
  const newCart = new Cart();
  if (!cartsManager.addCart(newCart)) {
    infoStatus.info = 'No se ha podido añadir el carrito';
    res.json(infoStatus);
    return;
  }

  infoStatus.status = 'Creado correctamente';
  infoStatus.info = newCart;
  res.json(infoStatus);
});

//GET cart :id
cartRouter.get(path + ':cartId', (req, res) => {
  const { cartId } = req.params;
  if (!cartsManager.esIdValido(Number(cartId))) {
    infoStatus.info = 'El id ingresado es invalido';
    res.json(infoStatus);
    return;
  }
  const cart = cartsManager.getCartById(Number(cartId));
  res.json(cart);
});

//POST addProduct
cartRouter.post(path + ':cartId/products/:prodId', (req, res) => {
  const { cartId, prodId } = req.params;
  if (!cartsManager.esIdValido(Number(cartId))) {
    infoStatus.info = 'El id ingresado en cartId es invalido';
    res.json(infoStatus);
    return;
  }
  // Recordar agregar algun producto por el POST de products. Sino quitar el siguiente if:
  if (!prodManager.esIdValido(Number(prodId))) {
    infoStatus.info = 'El id ingresado en prodId es invalido';
    res.json(infoStatus);
    return;
  }
  if (!cartsManager.addProduct(Number(cartId), Number(prodId))) {
    infoStatus.info = 'No se pudo añadir el producto con el ID: ' + prodId;
    res.json(infoStatus);
    return;
  }
  const cart = cartsManager.getCartById(Number(cartId));
  infoStatus.status = 'Añadido correctamente';
  infoStatus.info = cart;
  res.json(infoStatus);
});

export default cartRouter;
