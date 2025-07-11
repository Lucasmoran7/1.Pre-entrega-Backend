const express = require('express');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 8080;

// Routes
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Managers
const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// HTTP Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Vistas
app.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// Server + Socket.io
const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('Cliente conectado por Socket.io');

  // Escuchar nuevo producto
  socket.on('nuevoProducto', async (nuevoProd) => {
    await productManager.addProduct(nuevoProd);
    const productos = await productManager.getProducts();
    io.emit('productosActualizados', productos);
  });

  // Escuchar eliminación
  socket.on('eliminarProducto', async (id) => {
    await productManager.deleteProduct(id);
    const productos = await productManager.getProducts();
    io.emit('productosActualizados', productos);
  });
});
