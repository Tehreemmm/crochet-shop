import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ import auth
import logo from "../assets/miyume.png";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{ backgroundColor: "#111" }}
    >
      <div className="container">
        {/* Brand + Logo */}
        <Link
          className="navbar-brand fw-bold fs-2 d-flex align-items-center"
          to="/"
          style={{ color: "#ff69b4" }}
        >
          <img
            src={logo}
            alt="Miyume Logo"
            className="me-2"
            style={{ height: "40px" }}
          />
          Miyume
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              filter:
                "invert(82%) sepia(42%) saturate(7499%) hue-rotate(308deg) brightness(96%) contrast(101%)",
            }}
          ></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {[
              { path: "/", label: "Home" },
              { path: "/products", label: "Products" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map((link, i) => (
              <li key={i} className="nav-item mx-2">
                <NavLink
                  className="nav-link"
                  to={link.path}
                  style={({ isActive }) => ({
                    color: isActive ? "#ff69b4" : "#f8f9fa",
                    borderBottom: isActive
                      ? "2px solid #ff69b4"
                      : "2px solid transparent",
                    transition: "all 0.3s ease",
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* 🔒 Admin-only Add Product */}
            {auth?.role === "admin" && (
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link"
                  to="/add-product"
                  style={({ isActive }) => ({
                    color: isActive ? "#ff69b4" : "#f8f9fa",
                    borderBottom: isActive
                      ? "2px solid #ff69b4"
                      : "2px solid transparent",
                    transition: "all 0.3s ease",
                  })}
                >
                  Add Product
                </NavLink>
              </li>
            )}

            {/* Cart */}
            <li className="nav-item ms-3">
              <NavLink
                className="nav-link d-flex align-items-center position-relative"
                to="/cart"
                style={{ color: "#f8f9fa" }}
              >
                <ShoppingCart className="me-1" size={20} />
                Cart
                {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ backgroundColor: "#ff69b4", fontSize: "0.75rem" }}
                  >
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </li>

            {/* Auth buttons */}
            {!auth.token ? (
              <li className="nav-item ms-3">
                <NavLink
                  className="btn btn-sm"
                  to="/login"
                  style={{
                    backgroundColor: "#ff69b4",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item ms-3 d-flex align-items-center">
                <span
                  style={{
                    color: "#f8f9fa",
                    marginRight: "10px",
                    fontSize: "0.9rem",
                  }}
                >
                  Hi, {auth.username} ({auth.role})
                </span>
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#ff69b4",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

