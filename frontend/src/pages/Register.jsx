import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      login(res.data.token, res.data.user?.role || "user");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1e1e1e", color: "#111" }}
    >
      <div
        className="p-5 rounded shadow"
        style={{
          backgroundColor: "#f8e9ec",
          width: "100%",
          maxWidth: "420px",
          border: "1px solid #e5c1c5",
        }}
      >
        <h2
          className="fw-bold text-center mb-4"
          style={{ color: "#c76284", letterSpacing: "1px" }}
        >
          Create Your Miyume Account 🧶
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control border-0 rounded-0 p-3"
              style={{
                backgroundColor: "#fff",
                color: "#111",
                boxShadow: "0 0 0 1px #e5c1c5",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control border-0 rounded-0 p-3"
              style={{
                backgroundColor: "#fff",
                color: "#111",
                boxShadow: "0 0 0 1px #e5c1c5",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="form-control border-0 rounded-0 p-3"
              style={{
                backgroundColor: "#fff",
                color: "#111",
                boxShadow: "0 0 0 1px #e5c1c5",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 fw-semibold rounded-0"
            style={{
              backgroundColor: "#c76284",
              color: "#fff",
              border: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#a54f6b")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#c76284")}
          >
            Register
          </button>
        </form>

        {error && (
          <p className="text-center mt-3" style={{ color: "#b30000" }}>
            {error}
          </p>
        )}

        <p className="text-center mt-4" style={{ color: "#333" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#c76284", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

