import { Router } from 'express';
import Product from '../class/Product.js';
import { prodManager } from '../server.js';

const formRouter = Router();
const path = '/';
const infoStatus = { status: 'Error', info: '' };

formRouter.get(path, (req, res) => {
  res.render('form', {
    fileCss: 'form.css',
  });
});

formRouter.post(path, (req, res) => {
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
  res.render('respuesta', {
    status: infoStatus.status,
    info: infoStatus.info,
    isError: infoStatus.status === 'Error',
    isIterable: true,
    fileCss: 'respuesta.css',
  });
});

export default formRouter;
