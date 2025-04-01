const express = require("express");
const router = express.Router();



// Obtener productos de un carrito
router.get('/:cid', async (req, res) => {
    try {
      const cart = await CartManager.getCartById(req.params.cid);
      if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado." });
      }
      res.json(cart.products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el carrito." });
    }
  });
  
  // Agregar producto a un carrito
  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      const updatedCart = await CartManager.addProductToCart(req.params.cid, req.params.pid);
      if (!updatedCart) {
        return res.status(404).json({ message: "Carrito o producto no encontrado." });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: "Error al agregar el producto al carrito." });
    }
  });
  