import DataManager from './DataManager.js';
import Product from './Product.js';

class ProductManager {
  constructor(path) {
    this.dataManager = new DataManager(path);
    this.products = [];
    this._getData();
  }

  async _sendData() {
    await this.dataManager.writeObjectList(this.products);
  }

  async _getData() {
    const data = await this.dataManager.getObjectList();
    this.products = data.map((obj) => Product.make(obj));
  }

  addProduct(product) {
    if (!this.esProductoValido(product)) {
      return false;
    }
    return this._add(product);
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
    if (!this.products.some((prod) => prod.code === codigo)) {
      return false;
    }
    console.error(`El codigo ${codigo} es un codigo repetido`);
    return true;
  }

  _add(product) {
    const length = this.products.push(product);
    this._sendData();
    return Boolean(length);
  }

  removeProduct(product) {
    if (!this.existeProduct(product)) {
      console.error(`No existe el producto: ${product}`);
    }
    return this._remove(this._getPos(product));
  }

  deleteProduct(id) {
    if (!this.esIdValido(id)) {
      throw new Error('ID invalido');
    }
    return this.removeProduct(this.getProductById(id));
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
    const pop = this.products.splice(pos, 1)[0];
    this._sendData();
    return pop;
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
    try {
      if (!this.esIdValido(id)) {
        throw new Error('ID invalido');
      }
      this.products[id - 1] = this.getProductById(id).rightUnion(newProduct);
      this._sendData();
      return true;
    } catch (error) {
      return false;
    }
  }

  remplazeProduct(id, newProduct) {
    try {
      if (!this.esIdValido(id)) {
        throw new Error('ID invalido');
      }
      const oldProduct = this.removeProduct(this.getProductById(id));
      if (!this.esProductoValido(newProduct)) {
        this.products[id - 1] = oldProduct;
        throw new Error('No se pudo actualizar el producto con el ID: ' + id);
      }
      this.products[id - 1] = newProduct;
      this._sendData();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default ProductManager;
