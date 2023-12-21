import { Router } from 'express';
import ProductDao from '../daos/dbmanager/Product.dao.js';

const productRouter = Router();

const path = '/';

//GET query
productRouter.get(path, async (req, res) => {
  try {
    const products = await ProductDao.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//GET params
productRouter.get(path + ':id', async (req, res) => {
  try {
    const product = await ProductDao.getProductById(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//POST addProduct
productRouter.post(path, async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, category, id } =
      req.body;
    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      _id: id,
    };
    const status = await ProductDao.addProduct(product);
    res.json(status);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//PUT actualizar
productRouter.put(path + ':id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;

    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      status: status,
      _id: id,
    };
    const infoStatus = await ProductDao.updateProduct(id, product);
    res.json(infoStatus);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

//DELETE removeProduct
productRouter.delete(path + ':id', async (req, res) => {
  try {
    const { id } = req.params;
    const status = await ProductDao.deleteProduct(id);
    res.json(status);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default productRouter;
