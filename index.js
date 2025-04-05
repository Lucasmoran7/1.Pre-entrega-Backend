const express = require('express');
const app = express();
const port = 8080;

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
console.log("productsRouter:", productsRouter);

// managers
const ProductManager = require('./managers/ProductManager');
const CartManager = require('./managers/CartManager');

app.use(express.json());

// rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
