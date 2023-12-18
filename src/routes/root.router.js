import { Router } from 'express';

const rootRouter = Router();

const path = '/';

rootRouter.get(path, (req, res) => {
  res.send('Bienvenido a mi primer servidor');
});

export default rootRouter;
