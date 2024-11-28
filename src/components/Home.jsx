import React from 'react';
import './Styles/home.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
          <div class="background-image">
            <button class='shop-now-button'>Shop Now</button>
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
        <div class="product-list">
        <section className="gift-sections">
        <h2>DEALS TOO GOOD TO MISS</h2>
        <ul>
            <li>
            <div class="img1"/>
            <span class="text">SHOES UNDER $50</span>
            </li>

            <li>
            <div class="img1"/>
            <span class="text">SHOES UNDER $50</span>
            </li>

            <li>
            <div class="img2"/>
            <span class="text">SHOES UNDER $50</span>
            </li>

            <li>
            <div class="img3"/>
            <span class="text">SHOES UNDER $50</span>
            </li>

            <li>
            <div class="img4"/>
            <span class="text">SHOES UNDER $50</span>
            </li>           
        </ul>
        </section>
        </div>

        <div className="shopping-made-easy">
          <h3>SHOPPING MADE EASY</h3>
          <h4>FIND WHAT WORKS FOR YOU</h4>
          <section className="shopping-options">
            <div className="option">
              <h5>E-GIFT CARDS</h5>
              <p>PURCHASE E-GIFT CARDS FOR EASY GIFT GIVING</p>
            </div>
            <div className="option">
              <h5>EMAIL SIGN-UP</h5>
              <p>BE IN THE KNOW FOR THE LATEST PUMA NEWS</p>
            </div>
            <div className="option">
              <h5>DOWNLOAD PUMA APP</h5>
              <p>DISCOVER APP EXCLUSIVES, SHOP OUR NEWEST COLLECTIONS AND VIEW OUR LAUNCH CALENDAR</p>
            </div>
            <div className="option">
              <h5>BUY NOW, PAY LATER</h5>
              <p>JUST LIKE IT SAYS. SHOP USING PAYPAL, AFTERPAY, OR KLARNA</p>
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