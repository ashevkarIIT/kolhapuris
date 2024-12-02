import React, { useEffect, useState } from 'react';
import './Styles/productListings.css';
import { IoChevronDownOutline } from "react-icons/io5";
import { PiSlidersHorizontal } from "react-icons/pi";
import { FaCircleChevronDown } from "react-icons/fa6";



const LandingPage = () => {
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [sortFilter, setSortFilter] = useState('');

    // Fetch data from JSON file
    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.categories);
                // Set filtered products initially
                setFilteredProducts(
                    data.categories.flatMap((category) => category.products)
                );
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Filter and Sort Products
    useEffect(() => {
      let updatedProducts = categories.flatMap((category) => category.products);

      updatedProducts = updatedProducts.filter((product) => {
        // Category Filter
        const categoryMatch = !categoryFilter || categories
          .find((cat) => cat.name === categoryFilter)
          ?.products.map((p) => p.id)
          .includes(product.id);
    
        // Gender Filter
        const genderMatch = !genderFilter || product.gender === genderFilter;
    
        // Price Filter
        const price = parseFloat(product.price.substring(1));
        const priceMatch = 
          !priceFilter || 
          (priceFilter === 'low' && price < 60) || 
          (priceFilter === 'high' && price >= 60)||
          (priceFilter === 'all' && true);
    
        return categoryMatch && genderMatch && priceMatch;
      });
    
      // Sorting
      if (sortFilter === 'lowToHigh') {
        updatedProducts.sort((a, b) => 
          parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1))
        );
      } else if (sortFilter === 'highToLow') {
        updatedProducts.sort((a, b) => 
          parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1))
        );
      } else if (sortFilter === 'alphabetical') {
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
    
      setFilteredProducts(updatedProducts);
    }, [categoryFilter, priceFilter, genderFilter, sortFilter, categories]);

    // Sidebar Filters
    const [expandedSection, setExpandedSection] = useState(null);

    const filterSections = [
        { id: 'gender', label: 'Gender' },
        { id: 'price', label: 'Shop by Price' },
        { id: 'categories', label: 'Categories' },
    ];

    const toggleSection = (sectionId) => {
      // Don't collapse the categories section if it's already expanded
      if (sectionId === 'categories' && expandedSection !== 'categories') {
          setExpandedSection('categories'); // Force categories section to stay open
      } else {
          setExpandedSection(expandedSection === sectionId ? null : sectionId);
      }
  };
  

    // Add to Cart
    const handleAddToCart = (product) => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...savedCart, { ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Item added to cart!');
    };

    //to clear filters
    const clearAllFilters = () => {
      setCategoryFilter('');
      setPriceFilter('');
      setGenderFilter('');
      setSortFilter('');
    };
  
    return (
      <div className="container">
      <div className="content-header">
      <div className="search-header">
                    <span>Search results for <p> jordan (1311)</p></span>
                    
                </div>
        <div className="filter-controls">
          <span className="filter-button" onClick={clearAllFilters}>
          <PiSlidersHorizontal />
          Clear Filters
          </span>
          <div className="sort-dropdown">
            <select onChange={(e) => setSortFilter(e.target.value)}>
              <option value=""> 
              Sort By 
              </option>
              <option value="lowToHigh">Price: Low-High</option>
              <option value="highToLow">Price: High-Low</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>


        <div className="product-listing-container">
            {/* Sidebar Filters */}
            <aside className="sidebar">
              

                {filterSections.map((section) => (
                    <div key={section.id} className="filter-item">
                        <div className="filter-header" 
                            onClick={() => toggleSection(section.id)}
                        >                       
                        {section.label}
                        <span className={`chevron ${expandedSection === section.id ? 'expanded' : ''}`}>
                          › 
                        </span>
                        </div>

                        {expandedSection === section.id && section.id === 'categories' && (
                            <div className="filter-content">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={categoryFilter === ''}
                                    onChange={() => setCategoryFilter('')}
                                />
                                All
                            </label>

                                {categories.map((category) => (
                                    <div key={category.name}>
                                            <label>
                                            <input
                                                type="checkbox"
                                                checked={categoryFilter === category.name}
                                                onChange={() => setCategoryFilter(category.name)}
                                            />
                                            {category.name}
                                        </label>
                                        
                                    </div>
                                ))}
                            </div>
                        )}

                        {expandedSection === section.id && section.id === 'gender' && (
                          
                            <div className="filter-content">
                                <label>
                                 <input
                                  type="checkbox"
                                  checked={genderFilter === ''}
                                  onChange={() => setGenderFilter('')}
                                  />
                                  All
                              </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={genderFilter === 'Women'}
                                        onChange={() => setGenderFilter('Women')}
                                    />
                                    Women
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={genderFilter === 'Men'}
                                        onChange={() => setGenderFilter('Men')}
                                    />
                                    Men
                                </label>
                            </div>
                        )}

                        {expandedSection === section.id && section.id === 'price' && (
                            <div className="filter-content">
                              <label>
                                    <input
                                        type="checkbox"
                                        checked={priceFilter === 'all'}
                                        onChange={() => setPriceFilter('all')}
                                    />
                                    All
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={priceFilter === 'low'}
                                        onChange={() => setPriceFilter('low')}
                                    />
                                    Under $60
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={priceFilter === 'high'}
                                        onChange={() => setPriceFilter('high')}
                                    />
                                    $60 and above
                                </label>
                            </div>
                        )}
                    </div>
                ))}
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className="product-card" key={product.id}>
                                <div className="product-badge">
                                    {product.badge && <span>{product.badge}</span>}
                                </div>
                                <img src={product.imageUrls[0]} alt={product.name} />
                                <div className="product-info">
                                    <h3>{product.name}</h3>                                   
                                    <p className="price">{product.price}</p>
                                  
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="add-to-cart-button"
                                    >
                                        Add to Cart
                                    </button>  
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found for the selected filters.</p>
                    )}
                </div>
            </main>
        </div>
      </div>
    );
};

export default LandingPage;
