import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/productDetail.css'; // Style the product details page here

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch data from JSON or any other API
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        // Find the product with the matching ID
        const product = data.categories
          .flatMap(category => category.products)
          .find(prod => prod.id.toString() === productId);

        setProduct(product); // Set the product state
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [productId]);

  // If product is still loading
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <h1>{product.name}</h1>
      <div className="product-detail">
        <div className="product-image" style={{ backgroundImage: `url(${product.imageClass})` }}></div>
        <div className="product-info">
          <h2>{product.price}</h2>
          <p>{product.description}</p>
          <p><strong>Sizes Available:</strong> {product.sizes.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
