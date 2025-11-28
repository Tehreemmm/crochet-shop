import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card shadow-sm border-0">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted">Rs. {product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="btn btn-pink"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

