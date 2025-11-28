import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [addedProduct, setAddedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category || "Uncategorized"))];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product._id);
    setTimeout(() => setAddedProduct(null), 1500);
  };

  return (
    <div
      className="container-fluid py-5 min-h-screen"
      style={{
        backgroundColor: "#fff7f8", // soft blush
        color: "#1a1a1a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h1
          className="fw-bold"
          style={{
            color: "#1a1a1a",
            fontSize: "2.8rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Shop Miyume
        </h1>
        <p
          className="lead"
          style={{
            color: "#555",
            fontSize: "1.1rem",
            fontWeight: "300",
          }}
        >
          Explore cozy handmade crochet pieces with timeless elegance 🧶
        </p>
      </div>

      {/* Search + Filters */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-5 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor: "#fff",
              color: "#1a1a1a",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "0.8rem",
            }}
          />
        </div>
        <div className="col-md-5 mb-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              backgroundColor: "#fff",
              color: "#1a1a1a",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "0.8rem",
            }}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p._id} className="col-md-4">
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  backgroundColor: "#ffffff",
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
                <div
                  style={{
                    height: "260px",
                    backgroundColor: "#f9f9f9",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                  />
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="fw-bold mb-2" style={{ color: "#1a1a1a" }}>
                    {p.name}
                  </h5>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.95rem",
                      flexGrow: "1",
                      marginBottom: "1rem",
                    }}
                  >
                    {p.description}
                  </p>
                  <p
                    className="fw-bold mb-3"
                    style={{
                      color: "#222",
                      fontSize: "1.1rem",
                    }}
                  >
                    Rs. {p.price}
                  </p>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: "#ff8fb1",
                      color: "#fff",
                      borderRadius: "6px",
                      border: "none",
                      padding: "0.75rem 0",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff6fa0")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff8fb1")}
                    onClick={() => handleAddToCart(p)}
                  >
                    {addedProduct === p._id ? "✔️ Added!" : "Add to Cart 🛒"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center" style={{ color: "#666" }}>
            No products found 😢
          </p>
        )}
      </div>
    </div>
  );
}

