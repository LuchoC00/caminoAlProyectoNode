import CartProduct from './CartProduct.js';

class Cart {
  constructor(products) {
    this.products = products ?? [];
  }

  static make(obj) {
    return new Cart(obj.products);
  }

  addProduct(productId) {
    if (this.getQuantity(productId) > 0) {
      return this._addQuantity(this._searchPos(productId));
    }
    return this._add(productId);
  }

  getQuantity(productId) {
    const prodId = this.products.find((obj) => {
      if (obj.productId === productId) {
        return true;
      }
    });
    return prodId ? prodId.quantity : 0;
  }

  _searchPos(productId) {
    return this.products.findIndex((obj) => obj.productId === productId);
  }

  _addQuantity(pos) {
    try {
      this.products[pos].quantity++;
      return true;
    } catch (error) {
      return false;
    }
  }

  _add(productId) {
    try {
      const cartProduct = new CartProduct(productId, 1);
      this.products.push(cartProduct);
      return true;
    } catch (error) {
      return false;
    }
  }

  esCartCompleto() {
    return Array.isArray(this.products);
  }

  getProductById(id) {
    if (!this.esIdValido(id)) {
      throw new Error('ID invalido');
    }
    return this.products[id - 1];
  }
}
export default Cart;
