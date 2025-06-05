# API de Productos y Carritos

Este proyecto es una API RESTful construida con Node.js y Express, que permite gestionar un catálogo de productos y carritos de compras.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- File System (fs)
- JavaScript

## 📁 Estructura del proyecto

/managers
ProductManager.js
CartManager.js
/routes
products.routes.js
carts.routes.js
/data
products.json
carts.json
index.js (o server.js)
README.md


## 📌 Funcionalidades principales

### Productos (`/api/products`)

- `GET /api/products/:pid` → Obtener producto por ID.
- `PUT /api/products/:pid` → Actualizar un producto.
- `DELETE /api/products/:pid` → Eliminar un producto.

### Carritos (`/api/carts`)

- `GET /api/carts/:cid` → Obtener productos de un carrito.
- `POST /api/carts/:cid/product/:pid` → Agregar un producto al carrito.

## ▶️ Cómo ejecutar el proyecto

1. Cloná o descargá este repositorio.
2. Asegurate de tener Node.js instalado.
3. Instalá dependencias (si usás `express`):

```bash
npm install
