const fs = require('fs');
const cartsFile = './data/carts.json';
const ProductManager = require('./ProductManager');
const productManager = new ProductManager();

class CartManager {
  async getCarts() {
    try {
      const data = await fs.promises.readFile(cartsFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error al leer los carritos");
    }
  }

  async getCartById(cid) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === parseInt(cid));
  }

  async addCart(cart) {
    const carts = await this.getCarts();
    carts.push(cart);
    await fs.promises.writeFile(cartsFile, JSON.stringify(carts, null, 2));
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === parseInt(cid));
    const product = await productManager.getProductById(pid);

    if (!cart || !product) return null;

    const productInCart = cart.products.find(p => p.product === parseInt(pid));
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: parseInt(pid), quantity: 1 });
    }

    await fs.promises.writeFile(cartsFile, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;

