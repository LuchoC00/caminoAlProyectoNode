import express from 'express';
import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import rootRouter from './routes/root.routes.js';
import ProductManager from './class/ProductManager.js';
import CartManager from './class/CartManager.js';

const app = express();
const port = 8080;

const prodPath = './data/productsData.json';
const prodManager = new ProductManager(prodPath);

const cartPath = './data/cartData.json';
const cartsManager = new CartManager(cartPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});

export { prodManager, cartsManager };
