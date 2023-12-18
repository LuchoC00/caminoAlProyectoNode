import { Router } from 'express';

const productsRouter = Router();

const path = '/';

productsRouter.get(path, (req, res) => {
  res.send('Bienvenido a mi primer servidor');
});

export default productsRouter;
