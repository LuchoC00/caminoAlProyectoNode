import DataManager from './DataMAnager';
import Product from './Product';

class ProductManager {
  constructor(path) {
    this.dataManager = new DataManager(path);
    this.products = [];
  }

  addProduct(product) {
    if (!this.esProductoValido(product)) {
      return false;
    }
    return this._add();
  }

  esProductoValido(product) {
    if (
      !this.esTipoProduct(product) ||
      !this.esProductoCompleto(product) ||
      this.esCodigoRepetido(product.code)
    ) {
      return false;
    }
    return true;
  }

  esTipoProduct(product) {
    if (!product instanceof Product) {
      console.error(`El producto ${product} no es un producto de tipo Product`);
      return false;
    }
    return true;
  }
  esProductoCompleto(product) {
    if (product.esProductoIncompleto()) {
      console.error(`El producto ${product} no es un producto completo`);
      return false;
    }
    return true;
  }

  esCodigoRepetido(codigo) {
    if (this.products.some((prod) => prod.code === codigo)) {
      console.error(`El codigo ${codigo} es un codigo repetido`);
      return false;
    }
    return true;
  }

  _add(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    if (!this.existeProduct(product)) {
      console.error(`No existe el producto: ${product}`);
    }
    return this._remove(_getPos(product));
  }

  existeProduct(product) {
    return this.products.includes(product);
  }

  _getPos(product) {
    if (!this.existeProduct(product)) {
      return 1;
    }
    return this.products.findIndex((prod) => Product.isEquals(prod, product));
  }

  _remove(pos) {
    return this.products.splice(pos, 1)[0];
  }

  getId(product) {
    if (!this.existeProduct(product)) {
      throw new Error('no existe producto');
    }
    return this._getPos(product) + 1;
  }

  getProductById(id) {
    if (!this.esIdValido(id)) {
      throw new Error('ID invalido');
    }
    return this.products[id - 1];
  }

  esIdValido(id) {
    if (id < 1 || id > this.products.length) {
      return false;
    }
    return true;
  }

  updateProduct(id, newProduct) {
    if (!this.esIdValido(id)) {
      throw new Error('ID invalido');
    }
    this.getProductById(id).rightUnion(newProduct);
  }

  remplazeProduct(id, newProduct) {
    if (!this.esIdValido(id)) {
      throw new Error('ID invalido');
    }
    const oldProduct = this.removeProduct(this.getProductById(id));
    if (!this.esProductoValido(newProduct)) {
      this.products[id - 1] = oldProduct;
    }
    this.products[id - 1] = newProduct;
  }
}

export default ProductManager;
