import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register"; 


import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// ✅ Protected route wrapper
function PrivateRoute({ children, role }) {
  const { auth } = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }
  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* 🔒 Admin-only route */}
            <Route
              path="/add-product"
              element={
                <PrivateRoute role="admin">
                  <AddProduct />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

