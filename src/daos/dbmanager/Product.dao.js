import { productModel } from '../../models/product.model.js';

class ProductDao {
  static async getAllProducts() {
    return await productModel.find();
  }
  static async getProductById(id) {
    return await productModel.findById(id);
  }
  static async addProduct(product) {
    return await productModel.create(product);
  }
  static async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product, { new: true });
  }
  static async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default ProductDao;
