# 🛒 API de Productos y Carritos - Segunda Pre-entrega

Este proyecto es una API RESTful construida con **Node.js** y **Express**, que permite gestionar un catálogo de productos y carritos de compras. En esta segunda entrega se incorporan **WebSockets** y **Handlebars** para una vista en tiempo real de productos.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- File System (`fs`)
- Express Handlebars
- Socket.IO
- JavaScript

---

## 📁 Estructura del proyecto


proyecto-final/
├── managers/
│ ├── ProductManager.js
│ └── CartManager.js
├── routes/
│ ├── products.js
│ └── carts.js
├── views/
│ ├── layouts/
│ │ └── main.handlebars
│ ├── home.handlebars
│ └── realTimeProducts.handlebars
├── public/
│ └── js/
│ └── realtime.js 
├── data/
│ ├── products.json
│ └── carts.json
├── index.js
└── README.md



---

## 📌 Funcionalidades principales

### 🧩 Productos (`/api/products`)

- `GET /api/products/:pid` → Obtener producto por ID.
- `PUT /api/products/:pid` → Actualizar un producto.
- `DELETE /api/products/:pid` → Eliminar un producto.

### 🛒 Carritos (`/api/carts`)

- `GET /api/carts/:cid` → Obtener productos de un carrito.
- `POST /api/carts/:cid/product/:pid` → Agregar un producto al carrito.

---

## 🖼️ Vistas con Handlebars

### `/` → `home.handlebars`
Muestra una lista estática de productos.

### `/realtimeproducts` → `realTimeProducts.handlebars`
- Permite **agregar y eliminar productos** con formularios.
- La lista de productos se **actualiza automáticamente** gracias a WebSockets.

---

## 🔄 WebSockets con Socket.IO

- El servidor emite `actualizarProductos` cada vez que se crea o elimina un producto.
- Los clientes conectados actualizan su lista en tiempo real.

---

## ▶️ Cómo ejecutar el proyecto

1. Cloná o descargá este repositorio.
2. Instalá las dependencias:

```bash
npm install






Lucas Moran
Curso Backend - Coderhouse
Segunda Pre-entrega