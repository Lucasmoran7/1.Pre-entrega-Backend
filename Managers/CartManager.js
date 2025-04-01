const fs = require('fs');
const cartsFile = './data/carts.json';
const ProductManager = require('./ProductManager'); 

class CartManager {
  // Obtener todos los carritos
  async getCarts() {
    try {
      const data = await fs.promises.readFile(cartsFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error al leer los carritos");
    }
  }

  // Obtener un carrito por ID
  async getCartById(cid) {
    try {
      const carts = await this.getCarts();
      return carts.find(c => c.id === parseInt(cid)); 
    } catch (error) {
      throw new Error("Error al obtener el carrito");
    }
  }

  // Crear un carrito nuevo
  async addCart(cart) {
    try {
      const carts = await this.getCarts();
      carts.push(cart);
      await fs.promises.writeFile(cartsFile, JSON.stringify(carts, null, 2)); 
    } catch (error) {
      throw new Error("Error al agregar el carrito");
    }
  }

  // Agregar producto a un carrito
  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(c => c.id === parseInt(cid));
      const product = await ProductManager.getProductById(pid); 

      if (!cart || !product) return null;

      const productInCart = cart.products.find(p => p.product === parseInt(pid));
      if (productInCart) {
        productInCart.quantity += 1; 
      } else {
        cart.products.push({ product: parseInt(pid), quantity: 1 });
      }

      await fs.promises.writeFile(cartsFile, JSON.stringify(carts, null, 2)); 
      return cart;
    } catch (error) {
      throw new Error("Error al agregar el producto al carrito");
    }
  }
}

module.exports = CartManager;
