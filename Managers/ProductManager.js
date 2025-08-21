const fs = require('fs');
const productsFile = './data/products.json';

class ProductManager {
  // Obtener todos los productos
  async getProducts() {
    try {
      const data = await fs.promises.readFile(productsFile, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      throw new Error("Error al leer los productos");
    }
  }

  // Obtener producto por ID
  async getProductById(pid) {
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === parseInt(pid));
      return product || null;
    } catch (error) {
      throw new Error("Error al obtener el producto");
    }
  }

  // Agregar nuevo producto
  async addProduct(productData) {
    try {
      const products = await this.getProducts();
      const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        ...productData
      };
      products.push(newProduct);
      await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error("Error al agregar el producto");
    }
  }

  // Actualizar producto
  async updateProduct(pid, updatedFields) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(p => p.id === parseInt(pid));
      if (productIndex === -1) return null;

      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2));
      return updatedProduct;
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  // Eliminar producto
  async deleteProduct(pid) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(p => p.id === parseInt(pid));
      if (productIndex === -1) return null;

      products.splice(productIndex, 1);
      await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }
}

module.exports = ProductManager;
