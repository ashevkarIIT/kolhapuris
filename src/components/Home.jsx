import React, { useEffect, useState } from "react";
import "./Styles/home.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jalsa, setJalsa] = useState([]);
  const [sliders, setSliders] = useState([]);

  const navigate = useNavigate();

  // Fetch data from JSON file
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        const oneProductFromEachCategory = data.categories.map(
          (category) => category.products[0]
        );
        const jalsaCollectionProducts = data.categories.find(
          (category) => category.name === "Jalsa Collection"
        ).products;
        const heelsCollectionProducts = data.categories.find(
          (category) => category.name === "Sliders"
        ).products;
        setSliders(heelsCollectionProducts);
        setJalsa(jalsaCollectionProducts);
        setProducts(oneProductFromEachCategory); // Set the first product from each category
        setCategories(data.categories); // Save all categories
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="landing-page">
      <div className="background-image">
        {/* <button className='shop-now-button'>Shop Now</button> */}
      </div>

      <div className="scrolling-banner">
        <section className="banner-content">
          <span>
            BLACK FRIDAY - 60% OFF - BLACK FRIDAY - 60% OFF - BLACK FRIDAY - 60%
            OFF - BLACK FRIDAY - 60% OFF - BLACK FRIDAY - 60% OFF -
          </span>
        </section>
      </div>

      <div className="product-list">
        <h2>EXPLORE THE COLLECTION</h2>
        <section className="shopping-options">
          {products.map((product) => (
            <div
              className="options"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-images">
                {Array.isArray(product.imageUrls) &&
                product.imageUrls.length > 0 ? (
                  <img
                    key={0}
                    src={product.imageUrls[0]} // Display the first image of the product
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <p>No images available</p> // Fallback message if no images
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

      <div className="bg1">
        {/* <button className='shop-now-button'>Shop Now</button> */}
      </div>

      <div className="product-section">
        <div className="product-header">
          <h1>HOT DEALS RIGHT NOW</h1>
          <h4>DEALS TOO GOOD TO MISS</h4>
        </div>

        <div className="prod-grid">
          {products.map((product) => {
            const category = categories.find((category) =>
              category.products.some((p) => p.id === product.id)
            );

            return (
              <div
                key={product.id}
                className="prod-card"
                onClick={() => navigate(`/products?category=${category?.name}`)}
              >
                <div className="product-image">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="category-image"
                  />
                </div>
                <div className="category-name">{category?.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg2"></div>

      <div className="product-list">
        <h2>Jalsa Collection</h2>
        <section className="shopping-options">
          {jalsa.map((product) => (
            <div
              className="options"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-images">
                {Array.isArray(product.imageUrls) &&
                product.imageUrls.length > 0 ? (
                  <img
                    key={0}
                    src={product.imageUrls[0]} // Display the first image of the product
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <p>No images available</p> // Fallback message if no images
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
      <div className="bg4"></div>

      <div className="product-list">
        <h2>Heels Collection</h2>
        <section className="shopping-options">
          {sliders.map((product) => (
            <div
              className="options"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-images">
                {Array.isArray(product.imageUrls) &&
                product.imageUrls.length > 0 ? (
                  <img
                    key={0}
                    src={product.imageUrls[0]} // Display the first image of the product
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <p>No images available</p> // Fallback message if no images
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
      <div className="bg3"></div>

      <footer></footer>
    </div>
  );
};

export default LandingPage;
