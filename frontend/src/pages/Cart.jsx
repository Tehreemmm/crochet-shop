import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const userId = "guest123"; // replace with logged-in user later
  const [cart, setCart] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const getId = (pid) => {
    if (!pid && pid !== 0) return "";
    if (typeof pid === "string") return pid;
    if (typeof pid === "object") {
      if (pid._id) return pid._id.toString();
      if (pid.toString) return pid.toString();
    }
    return String(pid);
  };

  const calcSummary = (items) => {
    const subtotal = items.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
    const shipping = subtotal > 2000 ? 0 : items.length > 0 ? 200 : 0;
    const tax = Math.round(subtotal * 0.05);
    const discount = subtotal > 5000 ? 500 : 0;
    const total = subtotal + shipping + tax - discount;
    return { subtotal, shipping, tax, discount, total };
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/api/cart/${userId}`);
      const items = res.data.items || [];
      setCart(
        items.map((it) => ({
          productId: getId(it.productId),
          name: it.name || (it.productId && it.productId.name) || "",
          price: Number(it.price) || (it.productId && it.productId.price) || 0,
          quantity: Number(it.quantity) || 1,
          image: (it.productId && it.productId.image) || "", // include product image
        }))
      );
      setSummary(
        res.data.summary ||
          calcSummary(
            items.map((it) => ({
              price: it.price || (it.productId && it.productId.price) || 0,
              quantity: it.quantity || 1,
            }))
          )
      );
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productIdOrObj, qty) => {
    const id = getId(productIdOrObj);
    if (!id || !Number.isFinite(qty) || qty < 1) return;

    const updatedCart = cart.map((item) =>
      getId(item.productId) === id ? { ...item, quantity: qty } : item
    );
    setCart(updatedCart);
    setSummary(calcSummary(updatedCart));

    try {
      await axios.put(`/api/cart/${userId}/${id}`, { quantity: qty });
      await fetchCart();
    } catch {
      await fetchCart();
    }
  };

  const removeFromCart = async (productIdOrObj) => {
    const id = getId(productIdOrObj);
    if (!id) return;

    setCart(cart.filter((item) => getId(item.productId) !== id));
    setSummary(calcSummary(cart.filter((item) => getId(item.productId) !== id)));

    try {
      await axios.delete(`/api/cart/${userId}/${id}`);
      await fetchCart();
    } catch {
      await fetchCart();
    }
  };

  const handleCheckout = async () => {
    if (!cart.length) return alert("🛑 Your cart is empty!");

    try {
      const res = await axios.post(`/api/checkout/${userId}`, { paymentMethod });
      alert(
        `✅ Checkout Summary:\nTotal: Rs. ${res.data.total}\nPayment: ${paymentMethod.toUpperCase()}`
      );
      setCart([]);
      setSummary(calcSummary([]));
    } catch {
      alert("Error during checkout. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="cart-wrapper">
        <p>Loading cart...</p>
      </div>
    );

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.image} alt={item.name} className="product-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Rs. {item.price}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.productId,
                        Math.max(1, parseInt(e.target.value || "1"))
                      )
                    }
                  />
                </div>
                <div className="item-actions">
                  <p>Rs. {item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        {summary && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: Rs. {summary.subtotal}</p>
            <p>Shipping: Rs. {summary.shipping}</p>
            <p>Tax (5%): Rs. {summary.tax}</p>
            <p>Discount: Rs. -{summary.discount}</p>
            <hr />
            <h2>Total: Rs. {summary.total}</h2>
            <div className="payment-method">
              <h5>Payment Method:</h5>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="easypaisa">EasyPaisa / JazzCash</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-wrapper {
          padding: 2rem;
          background-color: #fef6f9;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .cart-container {
          display: flex;
          flex-wrap: wrap;
          max-width: 1100px;
          gap: 2rem;
          width: 100%;
        }
        .cart-items {
          flex: 2;
        }
        .cart-item {
          display: flex;
          gap: 1rem;
          background: #fff;
          padding: 1rem;
          border-radius: 12px;
          align-items: center;
          margin-bottom: 1rem;
        }
        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }
        .item-details {
          flex: 1;
        }
        .item-details input {
          width: 60px;
          padding: 0.3rem;
          margin-top: 0.5rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .item-actions {
          text-align: right;
        }
        .item-actions button {
          margin-top: 0.5rem;
          background: #ff4d6d;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .order-summary {
          flex: 1;
          background: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          height: fit-content;
        }
        .order-summary hr {
          margin: 1rem 0;
          border-color: #ddd;
        }
        .checkout-btn {
          width: 100%;
          margin-top: 1rem;
          padding: 0.75rem;
          background: #ff99c8;
          border: none;
          color: #fff;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
        }
        .checkout-btn:hover {
          background: #ff80b3;
        }
        .empty-cart {
          font-style: italic;
        }
        @media(max-width: 768px){
          .cart-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

