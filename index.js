import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import Product from "./models/Product.js";

const app = express();
const PORT = 8080;

// 🟢 Conexión a MongoDB (ajusta la URI si tenés otro usuario o cluster)
mongoose
  .connect("mongodb://127.0.0.1:27017/proyectoFinalBackend")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Middleware para trabajar con JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas estáticas (JS frontend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// 🟢 Configuración de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// 🟢 Vista principal con productos
app.get("/", async (req, res) => {
  const products = await Product.find().lean(); // .lean() para que handlebars pueda leerlos
  res.render("home", { products });
});

// 🟢 Vista en tiempo real
app.get("/realtimeproducts", async (req, res) => {
  const products = await Product.find().lean();
  res.render("realTimeProducts", { products });
});

// Levantar servidor
const httpServer = app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);

// 🟢 Websocket con Socket.io
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("🟢 Nuevo cliente conectado");

  // Enviar lista inicial de productos
  Product.find()
    .lean()
    .then((products) => socket.emit("productos", products));

  // Escuchar cuando un cliente agrega producto
  socket.on("agregarProducto", async (data) => {
    await Product.create(data);
    const productosActualizados = await Product.find().lean();
    io.emit("productos", productosActualizados);
  });

  // Escuchar cuando un cliente elimina producto
  socket.on("eliminarProducto", async (id) => {
    await Product.findByIdAndDelete(id);
    const productosActualizados = await Product.find().lean();
    io.emit("productos", productosActualizados);
  });
});
