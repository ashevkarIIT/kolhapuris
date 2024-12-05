import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/productDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        let foundProduct = null;
        data.categories.forEach(category => {
          const found = category.products.find(p => p.id === parseInt(id));
          if (found) {
            foundProduct = found;
          }
        });
        setProduct(foundProduct);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...savedCart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Item added to cart!');
};
  
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-gallery">
        <div className="thumbnail-list">
          {product.imageUrls.map((img, index) => (
            <div 
              key={index} 
              className={`thumbnail ${selectedImage === index ? 'selected' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`${product.name} view ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-image">
          <img 
            src={product.imageUrls[selectedImage]} 
            alt={product.name} 
          />
          <div className="image-controls">
            <button onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : 0)}>
              ←
            </button>
            <button onClick={() => setSelectedImage(prev => 
              prev < product.imageUrls.length - 1 ? prev + 1 : prev)}>
              →
            </button>
          </div>
        </div>
      </div>

      <div className="product-info">
        <div className="product-header">
          <h1>{product.name}</h1>
          <p className="category">{product.gender}'s Footwear</p>
          <p className="description">{product.description}</p>
          <p className="price">{product.price}</p>
        </div>

        <div className="size-selector">
          <div className="size-header">
            <h3>Select Size</h3>
            <button className="size-guide">Size Guide</button>
          </div>
          <div className="size-grid">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button 
        onClick={() => handleAddToCart(product)}

        className="add-to-cart" >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;