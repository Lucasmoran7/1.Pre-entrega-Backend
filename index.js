const express = require('express');
const app = express();
const port = 8080;

const productsRouter = require("../routes/products");
const cartsRouter = require("../routes/carts");


// managers
const ProductManager = require('./managers/ProductManager');
const CartManager = require('./managers/CartManager');

app.use(express.json());

// rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/carts', require('./routes/carts'));

// servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
