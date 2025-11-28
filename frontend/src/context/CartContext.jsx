import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userId = "guest123"; // later replace with logged-in user
  const [cart, setCart] = useState([]);

  // ✅ Fetch cart from backend when app starts
  useEffect(() => {
    axios.get(`/api/cart/${userId}`)
      .then(res => setCart(res.data.items || []))
      .catch(err => console.error("❌ Error loading cart:", err));
  }, []);

  // ✅ Add item to cart
  const addToCart = async (product) => {
    try {
      const res = await axios.post(`/api/cart/${userId}`, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      setCart(res.data.items);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  // ✅ Remove item
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/${userId}/${productId}`);
      setCart(res.data.items);
    } catch (err) {
      console.error("❌ Error removing from cart:", err);
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(`/api/cart/${userId}/${productId}`, { quantity });
      setCart(res.data.items);
    } catch (err) {
      console.error("❌ Error updating quantity:", err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      const res = await axios.delete(`/api/cart/${userId}`);
      setCart(res.data.items);
    } catch (err) {
      console.error("❌ Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

