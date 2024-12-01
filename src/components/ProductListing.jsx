import React, { useEffect, useState } from 'react';
import './Styles/productListings.css';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  // Fetch data from JSON file
  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        // Initialize with all products
        setFilteredProducts(data.categories.flatMap((category) => category.products));
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle category filter change
  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
    filterProducts(e.target.value, priceFilter, sortFilter);
  };

  // Handle price filter change
  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
    filterProducts(categoryFilter, e.target.value, sortFilter);
  };

  // Handle sort filter change
  const handleSortFilter = (e) => {
    setSortFilter(e.target.value);
    filterProducts(categoryFilter, priceFilter, e.target.value);
  };

  // Filter products based on selected category, price, and sort filter
  const filterProducts = (category, price, sort) => {
    let updatedProducts = [];

    // Filter by Category
    if (category) {
      updatedProducts = categories
        .find((cat) => cat.name === category)?.products || [];
    } else {
      updatedProducts = categories.flatMap((cat) => cat.products);
    }

    // Filter by Price
    if (price === 'low') {
      updatedProducts = updatedProducts.filter((product) => parseInt(product.price.substring(1)) < 60);
    } else if (price === 'high') {
      updatedProducts = updatedProducts.filter((product) => parseInt(product.price.substring(1)) >= 60);
    }

    // Sort by Price or Alphabetically
    if (sort === 'highToLow') {
      updatedProducts = updatedProducts.sort((a, b) => parseInt(b.price.substring(1)) - parseInt(a.price.substring(1)));
    } else if (sort === 'lowToHigh') {
      updatedProducts = updatedProducts.sort((a, b) => parseInt(a.price.substring(1)) - parseInt(b.price.substring(1)));
    } else if (sort === 'alphabetical') {
      updatedProducts = updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(updatedProducts);
  };

  // Get unique categories for the filter dropdown
  const categoriesList = categories.map((category) => category.name);

  return (
    <div className="product-listing-page">
      {/* Filters Section */}
      <div className="filter-group">
        <label>Category:</label>
        <select onChange={handleCategoryFilter} value={categoryFilter}>
          <option value="">All Categories</option>
          {categoriesList.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Price:</label>
        <select onChange={handlePriceFilter} value={priceFilter}>
          <option value="">All</option>
          <option value="low">Under $60</option>
          <option value="high">Above $60</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By:</label>
        <select onChange={handleSortFilter} value={sortFilter}>
          <option value="">None</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {/* Product Listing */}
      <div className="product-lists">
        <h2>EXPLORE THE COLLECTION</h2>
        <section className="shopping">
          {filteredProducts.map((product) => (
            <div className="choice" key={product.id}>
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
    </div>
  );
};

export default LandingPage;
