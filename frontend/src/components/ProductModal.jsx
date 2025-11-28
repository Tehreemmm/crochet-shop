import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ProductModal({ show, onHide, product, onAdd }) {
  if (!product) return null;
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex gap-3">
        {product.image && (
          <img src={product.image} alt={product.name} style={{ width: 300, objectFit: "cover", borderRadius: 8 }} />
        )}
        <div>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-primary">PKR {product.price}</h4>
          <div className="mt-3">
            <Button variant="success" onClick={() => onAdd(product)}>Add to cart</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

