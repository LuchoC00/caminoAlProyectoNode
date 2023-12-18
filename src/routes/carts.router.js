import { Router } from 'express';

const cartsRouter = Router();

const path = '/';

cartsRouter.get(path, (req, res) => {
  res.send('Bienvenido a mi primer servidor');
});

export default cartsRouter;
