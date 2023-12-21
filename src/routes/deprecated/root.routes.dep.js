import { Router } from 'express';

const rootRouter = Router();

const path = '/';

rootRouter.get(path, (req, res) => {
  res.render('index', {
    bienvenida: 'Luciano',
    fileCss: 'style.css',
  });
});

export default rootRouter;
