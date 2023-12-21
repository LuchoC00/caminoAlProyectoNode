class CartProduct {
  constructor(productId, quantity) {
    this.productId = productId;
    this.quantity = quantity;
  }

  toString() {
    return ` | Cart: productID: ${this.productId} , quantity: ${this.quantity} | `;
  }
}

export default CartProduct;
