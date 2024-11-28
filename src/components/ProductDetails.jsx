import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the JSON file from the public directory
    fetch("/public/productDetails.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <h4>Rating: {product.rating} ★</h4>

      <h2>Customer Reviews:</h2>
      <ul>
        {product.reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.user}</strong>
            <p>Rating: {review.rating} ★</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
