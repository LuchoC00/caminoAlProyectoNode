import express from 'express';
import handlebars from 'express-handlebars';
import { __dirSrc, __dirProyecto } from './utils/dirnames.js';
import { PORT, password, db_name } from './utils/env.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import rootRouter from './routes/root.routes.js';
import formRouter from './routes/form.routes.js';
import chatRouter from './routes/chat.routes.js';
import MessageDao from './daos/dbmanager/Message.dao.js';

// Inicializacion de express
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//inicializacion de socket.io
const io = new Server(httpServer);
const chatIo = io.of('/chat');

//mongroose conection
mongoose
  .connect(
    `mongodb+srv://test:${password}@cluster0.jurxuwg.mongodb.net/${db_name}?retryWrites=true&w=majority`,
  )
  .then((res) => {
    console.log('Conexion con DB');
  })
  .catch((err) => {
    console.error(err);
  });

// Configuracion del engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'hbs');
app.set('views', `${__dirSrc}/views`);

// Public
app.use(express.static(`${__dirProyecto}/public`));

// Routes
app.use('/', rootRouter);
app.use('/form', formRouter);
app.use('/chat', chatRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

// Inicializacion de mensages
let messages = [];
const refreshMessages = async () => {
  messages = await MessageDao.getAllMessages();
};
refreshMessages();

// Comunicacion con el Socket
chatIo.on('connection', (socketClient) => {
  console.log(`Nuevo cliente conectado |-->| ID:${socketClient.id}`);

  socketClient.on('inicioUser', (data) => {
    console.log(
      `Usuario registrado --> Username: ${data.username} | Email: ${data.email}`,
    );
  });

  socketClient.emit('messages', messages);
  socketClient.on('message', async (data) => {
    try {
      await MessageDao.addMessage(data);
      await refreshMessages();
      chatIo.emit('messages', messages);
    } catch (error) {
      chatIo.emit('messages', 'Error en el mensage');
    }
  });
});
