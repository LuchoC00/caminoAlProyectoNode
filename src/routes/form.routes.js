import { Router } from 'express';
import ProductDao from '../daos/dbmanager/Product.dao.js';

const formRouter = Router();
const path = '/';

//GET renderForm
formRouter.get(path, (req, res) => {
  res.render('form', {
    fileCss: 'form.css',
  });
});

//POST addProduct
formRouter.post(path, async (req, res) => {
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

    const response = await ProductDao.addProduct(product);
    res.render('respuesta', {
      info: product,
      isIterable: true,
      fileCss: 'respuesta.css',
      status: 'Añadido exitosamente',
    });
  } catch (error) {
    console.error(error);
    res.render('respuesta', {
      info: error,
      isError: true,
      fileCss: 'respuesta.css',
      status: 'Error',
    });
  }
});

export default formRouter;
