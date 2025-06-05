const express = require('express');
const router = express.Router();  
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager();

// Obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
      const product = await ProductManager.getProductById(req.params.pid);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado." });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto." });
    }
  });
  
  // Actualizar un producto
  router.put('/:pid', async (req, res) => {
    try {
      const updatedProduct = await ProductManager.updateProduct(req.params.pid, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado." });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto." });
    }
  });
  
  // Eliminar un producto
  router.delete('/:pid', async (req, res) => {
    try {
      const deletedProduct = await ProductManager.deleteProduct(req.params.pid);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado." });
      }
      res.json({ message: "Producto eliminado." });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto." });
    }
  });

  module.exports = router;

  