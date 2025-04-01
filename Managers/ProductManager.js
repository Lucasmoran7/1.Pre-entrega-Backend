const fs = require('fs');
const productsFile = './data/products.json';

class ProductManager {
  // Obtener todos los productos
  async getProducts() {
    try {
      const data = await fs.promises.readFile(productsFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error al leer los productos");
    }
  }

  // Obtener un producto por ID
  async getProductById(pid) {
    try {
      const products = await this.getProducts();
      return products.find(p => p.id === parseInt(pid)); 
    } catch (error) {
      throw new Error("Error al obtener el producto");
    }
  }

  // Agregar un nuevo producto
  async addProduct(product) {
    try {
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2)); 
    } catch (error) {
      throw new Error("Error al agregar el producto");
    }
  }

  // Actualizar un producto
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

  // Eliminar un producto
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
