import { cartModel } from '../../models/cart.model.js';

class CartDao {
  static async getAllCarts() {
    return await cartModel.find();
  }
  static async getCartById(id) {
    return await cartModel.find({ id: Number(id) });
  }
  static async addCart(cart) {
    return await cartModel.create(cart);
  }
  static async createCart() {
    const lastIdCart = await cartModel.findOne().sort({ id: -1 });
    const id = lastIdCart ? lastIdCart.id + 1 : 1;
    return await cartModel.create({ products: [], id: Number(id) });
  }
  static async updateCart(id, cart) {
    return await cartModel.findOneAndUpdate({ id: Number(id) }, cart, {
      new: true,
    });
  }
  static async deleteCart(id) {
    return await cartModel.findOneAndDelete({ id: Number(id) });
  }

  static async addCartProduct(id, cartProduct) {
    return await cartModel.findOneAndUpdate(
      { id: Number(id) },
      {
        $push: { products: cartProduct },
      },
      { new: true },
    );
  }

  static async getCartProductById(idCart, idProd) {
    const cart = await cartModel.find({ id: idCart });
    return cart.products.find((prod) => {
      return prod === idProd;
    });
  }
}

export default CartDao;
