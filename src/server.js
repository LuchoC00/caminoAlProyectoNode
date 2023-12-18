import express from 'express';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/form', express.static('public'));

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});
