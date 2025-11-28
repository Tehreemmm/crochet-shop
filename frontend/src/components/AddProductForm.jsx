import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AddProductForm() {
  const { auth } = useAuth();
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [message, setMessage] = useState("");

  if (!auth?.token || auth.role !== "admin") {
    return <p className="text-gray-600">🔒 Only admins can add products</p>;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/products",
        form,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setMessage(res.data.message);
      setForm({ name: "", price: "", stock: "" });
    } catch (err) {
      setMessage("❌ Error adding product");
    }
  };

  return (
    <div className="p-6 border rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Add Product (Admin Only)</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

