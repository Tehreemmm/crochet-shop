import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import heroBg from "../assets/bg.png";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const trending = filtered.slice(0, 4);
  const featured = filtered.slice(0, 4);

  return (
    <div
      style={{
        backgroundColor: "#fff7f8",
        color: "#1a1a1a",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Announcement Bar */}
<div
  className="text-center py-2 small"
  style={{
    backgroundColor: "#f8e9ec", // keep soft pink
    color: "#1a1a1a",           // darker text
    fontWeight: 600,
    borderBottom: "1px solid #e5c1c5",
  }}
>
  🎉 Free shipping on orders over 2000 PKR!
</div>


      {/* Search Bar */}
      <div className="container my-4">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: "#fff",
            color: "#1a1a1a",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "0.8rem 1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        />
      </div>

     {/* Hero Section */}
<div
  className="text-center d-flex flex-column justify-content-center align-items-center"
  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
  }}
>
  <h1
    className="fw-bold"
    style={{
      color: "#ff8fb1",          // soft pink
      fontFamily: "'Inter', sans-serif", // match Products
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontSize: "2.5rem",        // smaller, not display-4
    }}
  >
    Handmade Crochet Magic 🧶✨
  </h1>
  <p
    className="lead"
    style={{
      color: "#f1c6d3",          // softer complementary pink
      fontFamily: "'Inter', sans-serif",
      fontWeight: "500",
      fontSize: "1.1rem",        // moderate size
    }}
  >
    Cozy pieces made with love.
  </p>
  <a
    href="/products"
    className="btn mt-3"
    style={{
      backgroundColor: "#ff8fb1",
      color: "#fff",
      border: "none",
      padding: "12px 32px",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff6fa0")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff8fb1")}
  >
    Shop Now
  </a>
</div>


      {/* Trending Products */}
      <div className="container my-5">
        <h2
          className="fw-bold mb-4 text-center"
          style={{ color: "#1a1a1a", letterSpacing: "1px" }}
        >
          Trending Now
        </h2>
        <div className="row">
          {trending.map((p) => (
            <div key={p._id} className="col-md-3 mb-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  backgroundColor: "#fff",
                  color: "#1a1a1a",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="fw-bold">{p.name}</h5>
                  <p style={{ color: "#555", flexGrow: 1 }}>Rs. {p.price}</p>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: "#ff8fb1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff6fa0")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff8fb1")}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container my-5">
        <h2
          className="fw-bold mb-4 text-center"
          style={{ color: "#1a1a1a", letterSpacing: "1px" }}
        >
          Featured
        </h2>
        <div className="row">
          {featured.map((p) => (
            <div key={p._id} className="col-md-3 mb-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  backgroundColor: "#fff",
                  color: "#1a1a1a",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="fw-bold">{p.name}</h5>
                  <p style={{ color: "#555", flexGrow: 1 }}>Rs. {p.price}</p>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: "#ff8fb1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff6fa0")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff8fb1")}
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="pt-5 pb-3 mt-5"
        style={{
          backgroundColor: "#ffe6ed",
          color: "#1a1a1a",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 style={{ color: "#1a1a1a", fontWeight: "700" }}>Miyume</h5>
              <p>Handmade crochet with love 🧶</p>
            </div>
            <div className="col-md-4">
              <h6 style={{ color: "#1a1a1a" }}>Links</h6>
              <ul className="list-unstyled">
                <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
                <li><a href="/products" className="text-dark text-decoration-none">Shop</a></li>
                <li><a href="/about" className="text-dark text-decoration-none">About</a></li>
                <li><a href="/contact" className="text-dark text-decoration-none">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 style={{ color: "#1a1a1a" }}>Follow Us</h6>
              <a href="https://instagram.com" className="text-dark me-3">Instagram</a>
              <a href="https://facebook.com" className="text-dark me-3">Facebook</a>
              <a href="mailto:info@miyume.com" className="text-dark">Email</a>
            </div>
          </div>
          <div className="text-center mt-3" style={{ color: "#555" }}>
            © {new Date().getFullYear()} Miyume. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

