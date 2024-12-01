import React, { useEffect, useState } from 'react';
import './Styles/home.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch data from JSON file
  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        const oneProductFromEachCategory = data.categories.map(category => category.products[0]);
        setProducts(oneProductFromEachCategory);
        // const kolhapuriProducts = data.categories.find(category => category.name === "Kolhapuri").products;
        // setProducts(kolhapuriProducts); // Set products from Kolhapuri category
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


  return (
    <div className="landing-page">
          <div class="background-image">
            {/* <button class='shop-now-button'>Shop Now</button> */}
          </div>

          <div class="scrolling-banner">
            <section class="banner-content">
              <span>BLACK FRIDAY - 60% OFF -
              BLACK FRIDAY - 60% OFF - 
              BLACK FRIDAY - 60% OFF - 
              BLACK FRIDAY - 60% OFF - 
              BLACK FRIDAY - 60% OFF - 
              </span>
            </section>
          </div>
  
          <div className="product-list">
        <h2>EXPLORE THE COLLECTION</h2>
        <section className="shopping-options">
          {products.map((product) => (
            <div className="options" key={product.id}>
            
            <div className="product-images">
                {Array.isArray(product.imageUrls) && product.imageUrls.length > 0 ? (
                  <img 
                  key={0} 
                  src={product.imageUrls[0]} 
                  alt={product.name} 
                  className="product-image" 
                />  
                ) : (
                  <p>No images available</p>  // Fallback message if no images
                )}
              </div>
              <p className="text">
                {product.name}
                <h2>{product.price}</h2>
              </p>
            </div>
          ))}
        </section>
      </div>

        <div className="product-display1">
          <h3>HOT DEALS RIGHT NOW</h3>
          <h5>DEALS TOO GOOD TO MISS</h5>

          <section className="banner">
            <div className="option">
            <div class="img1">
            <p className='banner-text'>Tan Hand Crafted Kolhapuri</p>
            </div>
            </div>
            <div className="option">
            <div class="img2">
            <p className='banner-text'>Earthen Clay Faux Leather Kolhapuri</p>
            </div>
            </div>
            <div className="option">
            <div class="img3">
            <p className='banner-text'>Maroon and Metallic Grey Faux Leather Kolhapuris</p>
            </div>
            </div>
            <div className="option">
            <div class="img4">
            <p className='banner-text'>Traditional Black Kolhapuri</p>
            </div>
            </div>
          </section>
        </div>
      

      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default LandingPage;