import { Router } from 'express';
import Product from '../class/Product.js';
import { prodManager } from '../server.js';
const productRouter = Router();

const path = '/';
const infoStatus = { status: 'Error', info: '' };

//GET query
productRouter.get(path, (req, res) => {
  const { limit } = req.query;
  const products = prodManager.getProducts();
  if (limit && Number(limit) < products.length) {
    res.json(products.slice(0, Number(limit)));
    return;
  }
  res.json(products);
});

//GET params
productRouter.get(path + ':id', (req, res) => {
  const { id } = req.params;

  if (!prodManager.esIdValido(Number(id))) {
    infoStatus.info = `No existe producto con la id ${id}`;
    res.json(infoStatus);
    return;
  }
  const product = prodManager.getProductById(Number(id));
  res.json(product);
});

//POST addProduct
productRouter.post(path, (req, res) => {
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

  let rutes = [];
  if (thumbnail) {
    rutes = thumbnail;
  }

  const product = new Product(
    title,
    description,
    price,
    rutes,
    code,
    stock,
    status,
    category,
  );

  if (product.esProductoIncompleto()) {
    infoStatus.info = `No se ingresaron todos los datos para armar el producto`;
    res.json(infoStatus);
    return;
  } else if (prodManager.esCodigoRepetido(code)) {
    infoStatus.info = `el producto ingresado tiene un codigo repetido`;
    res.json(infoStatus);
    return;
  }

  prodManager.addProduct(product);
  infoStatus.status = 'Añadido exitosamente';
  infoStatus.info = product;
  res.json(infoStatus);
});

//PUT actualizar
productRouter.put(path + ':id', (req, res) => {
  const { id } = req.params;
  if (!prodManager.esIdValido(Number(id))) {
    infoStatus.info = `No existe producto con la id ${id}`;
    res.json(infoStatus);
    return;
  }

  const oldProduct = prodManager.getProductById(Number(id));
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

  let rutes = [];
  if (thumbnail) {
    rutes = thumbnail;
  }

  const product = new Product(
    title,
    description,
    price,
    rutes,
    code,
    stock,
    status,
    category,
  );

  if (!prodManager.updateProduct(Number(id), product)) {
    infoStatus.info = `No se ha podido actualizar el producto`;
    res.json(infoStatus);
    return;
  }

  infoStatus.status = 'Modificado exitosamente';
  infoStatus.info = product;
  res.json(infoStatus);
});

//DELETE removeProduct
productRouter.delete(path + ':id', (req, res) => {
  const { id } = req.params;
  if (!prodManager.esIdValido(Number(id))) {
    infoStatus.info = `No existe producto con la id ${id}`;
    res.json(infoStatus);
    return;
  }

  const oldProduct = prodManager.deleteProduct(Number(id));
  if (!oldProduct) {
    infoStatus.info = `error al eliminar el producto: ${oldProduct}`;
    res.json(infoStatus);
    return;
  }
  infoStatus.status = 'Eliminado exitosamente';
  infoStatus.info = oldProduct;
  res.json(infoStatus);
});

export default productRouter;
