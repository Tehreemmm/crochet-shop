# Crochet Shop — Full-Stack E-Commerce App

An end-to-end e-commerce platform for selling handcrafted crochet items. Built with **React, Node.js, Express, and MongoDB**
---

## Project Structure

```
crochet-shop/
│
├── backend/          
│   ├── models/      
│   ├── routes/      
│   ├── server.js     
│   └── package.json
│
├── frontend/         
│   ├── src/          
│   ├── public/       
│   └── package.json
│
└── README.md
```

## Tech Stack

### **Frontend**

* React + Vite
* React Router
* Context API
* Axios

### **Backend**

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt password hashing
* dotenv, cors, nodemon

##  Features

###  **User Features**

* Register / Login (JWT-based)
* Browse products
* Add to cart, update quantity, remove items
* Auto cart total calculation
* Checkout page (COD included; payment gateway-ready)

###  **Admin Features**

* Add new products
* Update or delete products
* Manage inventory
* Admin-only protected routes

##  Getting Started

### **Clone the Repo**

```bash
git clone https://github.com/your-username/crochet-shop.git
cd crochet-shop
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=<your mongo url>
JWT_SECRET=<your secret>
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

---

##  Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173/
```

Backend runs on:

```
http://localhost:5000/
```

---

##  API Routes (Quick Overview)

### **Auth**

* `POST /api/auth/register`
* `POST /api/auth/login`

### **Products**

* `GET /api/products`
* `POST /api/products` (admin)
* `DELETE /api/products/:id` (admin)

### **Cart**

* `GET /api/cart/:userId`
* `POST /api/cart/:userId`
* `PUT /api/cart/:userId/:productId`
* `DELETE /api/cart/:userId/:productId`

### **Checkout**

* `POST /api/checkout/:userId`
