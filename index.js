const express = require('express');
const app = express();
const port = 8080;

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());

// rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Productos y Carritos!');
});

// servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
