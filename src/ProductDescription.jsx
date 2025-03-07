import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductDescription = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product details");
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="100%" />
      <h2>Price: ${product.price}</h2>
      <p>{product.description}</p>
      <button style={{ padding: "10px", cursor: "pointer", background: "blue", color: "white", border: "none" }}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductDescription;