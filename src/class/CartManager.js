import Cart from './Cart.js';
import DataManager from './DataManager.js';

class CartManager {
  constructor(path) {
    this.dataManager = new DataManager(path);
    this.carts = [];
    this._getData();
  }

  async _sendData() {
    await this.dataManager.writeObjectList(this.carts);
  }

  async _getData() {
    const data = await this.dataManager.getObjectList();
    this.carts = data.map((obj) => {
      return Cart.make(obj);
    });
  }

  addCart(cart) {
    if (!this.esCartValido(cart)) {
      return false;
    }
    return this._addCart(cart);
  }

  esCartValido(cart) {
    if (!this._esCart(cart)) {
      return false;
    } else if (!cart.esCartCompleto()) {
      return false;
    }
    return true;
  }

  _esCart(cart) {
    if (!(cart instanceof Cart)) {
      console.error('El cart ingresado no es de tipo cart');
      return false;
    }
    return true;
  }

  _esCartCompleto(cart) {
    if (!cart.esCartCompleto()) {
      console.error('El cart ingresado no esta completo');
      return false;
    }
    return true;
  }

  _addCart(cart) {
    const length = this.carts.push(cart);
    this._sendData();
    return Boolean(length);
  }

  esIdValido(id) {
    if (id < 1 || id > this.carts.length) {
      return false;
    }
    return true;
  }

  getCartById(id) {
    if (!this.esIdValido(id)) {
      throw new Error('ID invalido');
    }
    return this.carts[id - 1];
  }

  addProduct(cartId, prodId) {
    try {
      if (!this.esIdValido(cartId)) {
        throw new Error('ID invalido');
      }
      return this._addProduct(cartId, prodId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  _addProduct(cartId, prodId) {
    const cart = this.getCartById(cartId);
    if (!cart.addProduct(prodId)) {
      console.error('No se pudo añadir el producto al carrito');
      return false;
    }
    this._sendData();
    return true;
  }
}

export default CartManager;
