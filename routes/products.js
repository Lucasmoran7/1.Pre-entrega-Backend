import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// 📌 Obtener todos los productos
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 📌 Obtener un producto por ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// 📌 Crear producto
router.post("/", async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
});

// 📌 Actualizar producto
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(updated);
});

// 📌 Eliminar producto
router.delete("/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ message: "Producto eliminado", deleted });
});

export default router;
