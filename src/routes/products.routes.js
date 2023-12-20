import { Router } from 'express';
import Product from '../class/Product.js';
import { prodManager } from '../server.js';
const productRouter = Router();

const path = '/';
const infoStatus = { status: '', info: '' };

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
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;

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
    true,
    category,
  );

  if (product.esProductoIncompleto()) {
    infoStatus.status = 'Error';
    infoStatus.info = `No se ingresaron todos los datos para armar el producto`;
  } else if (prodManager.esCodigoRepetido(code)) {
    infoStatus.status = 'Error';
    infoStatus.info = `el producto ingresado tiene un codigo repetido`;
  } else {
    prodManager.addProduct(product);
    infoStatus.status = 'Añadido exitosamente';
    infoStatus.info = product;
  }
  res.json(infoStatus);
});

//PUT actualizar
productRouter.put(path + ':id', (req, res) => {
  const { id } = req.params;
  if (!prodManager.esIdValido(Number(id))) {
    infoStatus.info = `No existe producto con la id ${id}`;
    infoStatus.status = 'Error';
    res.json(infoStatus);
    return;
  }

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
    infoStatus.status = 'Error';
    infoStatus.info = `No se ha podido actualizar el producto`;
  } else {
    infoStatus.status = 'Modificado exitosamente';
    infoStatus.info = product;
  }

  res.json(infoStatus);
});

//DELETE removeProduct
productRouter.delete(path + ':id', (req, res) => {
  const { id } = req.params;
  if (!prodManager.esIdValido(Number(id))) {
    infoStatus.info = `No existe producto con la id ${id}`;
    infoStatus.status = 'Error';
  } else {
    const oldProduct = prodManager.deleteProduct(Number(id));
    if (!oldProduct) {
      infoStatus.info = `error al eliminar el producto: ${oldProduct}`;
      infoStatus.status = 'Error';
    } else {
      infoStatus.status = 'Eliminado exitosamente';
      infoStatus.info = oldProduct;
    }
  }
  res.json(infoStatus);
});

export default productRouter;
