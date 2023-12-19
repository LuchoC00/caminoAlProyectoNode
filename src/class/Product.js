class Product {
  constructor(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = status ? status : true;
    this.category = category;
  }
  static make(objeto) {
    try {
      return new Product(
        objeto?.title,
        objeto?.description,
        objeto?.price,
        objeto?.thumbnail,
        objeto?.code,
        objeto?.stock,
        objeto?.status,
        objeto?.category,
      );
    } catch (error) {
      console.error(`error al inicializar el producto: ${objeto} \n` + error);
    }
  }

  static makeRandom() {
    const numberRandom = Math.floor(Math.random() * 1000);
    return this.make({
      title: 'Producto de Ejemplo',
      description: 'Esta es una descripción de ejemplo',
      price: 20,
      thumbnail: [],
      code: 'ABC' + String(numberRandom),
      stock: 50,
      status: true,
      category: 'Electrónicos',
    });
  }

  static isEquals(product1, product2) {
    if (!(product1 instanceof Product && product2 instanceof Product)) {
      throw new Error(`Algun objeto ingresado no es de tipo Product\n` + error);
    }
    return (
      product1.title === product2.title &&
      product1.description === product2.description &&
      product1.price === product2.price &&
      product1.thumbnail === product2.thumbnail &&
      product1.code === product2.code &&
      product1.stock === product2.stock &&
      product1.status === product2.status &&
      product1.category === product2.category
    );
  }
  toString() {
    return ` | Title: ${this.title} , Price: ${this.price} , Stock: ${this.stock} , Code: ${this.code} | `;
  }

  esProductoIncompleto() {
    return !(
      this?.title &&
      this?.description &&
      this?.price &&
      this?.thumbnail &&
      this?.code &&
      this?.stock &&
      this?.status &&
      this?.category
    );
  }

  rightUnion(product) {
    this.title = product.title ?? this.title;
    this.description = product.description ?? this.description;
    this.price = product.price ?? this.price;
    this.thumbnail = product.thumbnail ?? this.thumbnail;
    this.code = product.code ?? this.code;
    this.stock = product.stock ?? this.stock;
    this.status = product.status ?? this.status;
    this.category = product.category ?? this.category;
    return this;
  }
}

export default Product;
