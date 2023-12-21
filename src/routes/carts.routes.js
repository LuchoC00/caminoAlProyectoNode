import { Router } from 'express';
import CartDao from '../daos/dbmanager/Cart.dao.js';

const cartRouter = Router();
const path = '/';

//POST createCart
cartRouter.post(path, async (req, res) => {
  try {
    const status = await CartDao.createCart();
    res.json(status);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//GET cart :id
cartRouter.get(path + ':cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await CartDao.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//POST addProduct
cartRouter.post(path + ':cartId/products/:prodId', async (req, res) => {
  try {
    const { cartId, prodId } = req.params;
    const status = await CartDao.addCartProduct(cartId, prodId);
    res.json(status);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default cartRouter;
