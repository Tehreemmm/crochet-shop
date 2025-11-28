import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to continue shopping</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="login-footer">
          Don't have an account? <a href="/register" className="login-link">Register</a>
        </p>
      </div>

      <style jsx>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #fef6f9; /* soft pink background */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-card {
          background: #fff;
          padding: 3rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          text-align: center;
          width: 100%;
          max-width: 400px;
          color: #000; /* main text black */
        }
        .login-title {
          color: #000; /* black title */
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }
        .login-subtitle {
          color: #333; /* darker gray subtitle */
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .login-input {
          padding: 0.75rem 1rem;
          border-radius: 14px;
          border: 1px solid #ccc;
          background: #fff0f6;
          color: #000; /* input text black */
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .login-input::placeholder {
          color: #999; /* subtle placeholder */
        }
        .login-input:focus {
          border-color: #ff80b3;
          outline: none;
          box-shadow: 0 0 12px rgba(255,128,179,0.4);
        }
        .login-btn {
          padding: 0.85rem 1rem;
          border-radius: 16px;
          border: none;
          background-color: #ff99c8;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .login-btn:hover {
          background-color: #ff80b3;
          box-shadow: 0 4px 12px rgba(255,128,179,0.4);
        }
        .login-error {
          margin-top: 1rem;
          color: #ff4d4d;
          font-size: 0.95rem;
        }
        .login-footer {
          margin-top: 1.5rem;
          font-size: 0.95rem;
          color: #555; /* dark gray */
        }
        .login-link {
          color: #ff99c8;
          text-decoration: none;
          font-weight: 600;
        }
        .login-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Login;

