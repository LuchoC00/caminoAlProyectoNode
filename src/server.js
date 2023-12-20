import express from 'express';
import handlebars from 'express-handlebars';
import { __dirSrc, __dirProyecto } from './utils/dirnames.js';
import { Server } from 'socket.io';

import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import rootRouter from './routes/root.routes.js';
import formRouter from './routes/form.routes.js';

import ProductManager from './class/ProductManager.js';
import CartManager from './class/CartManager.js';

// Inicializacion de express
const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Definicion de los managers
const prodPath = './data/productsData.json';
const prodManager = new ProductManager(prodPath);
const cartPath = './data/cartData.json';
const cartsManager = new CartManager(cartPath);

app.use('/', rootRouter);
app.use('/form', formRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Comunicacion con el Socket
io.on('connection', (socketClient) => {
  console.log('nuevo cliente conectado');

  socketClient.on('message', (data) => {
    console.log(data);
    socketClient.emit('serverMessage', `Bien usuario ${socketClient.id},y tu?`);
  });

  socketClient.broadcast.emit('messageAll', 'hola a todos');
});

export { prodManager, cartsManager };
