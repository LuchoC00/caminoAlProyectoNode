import { Router } from 'express';

const chatRouter = Router();

const path = '/';

chatRouter.get(path, (req, res) => {
  res.render('chat', {
    fileCss: 'chat.css',
  });
});

export default chatRouter;
