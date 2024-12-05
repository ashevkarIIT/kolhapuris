import React from 'react';
import './Styles/TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms of Service</h1>
      <p className="terms-date">Effective Date: December 5, 2024</p>

      <section className="terms-section">
        <h2 className="terms-heading">1. Introduction</h2>
        <p className="terms-text">Welcome to Ethnics! These Terms of Service ("Terms") govern your use of our website, products, and services. By using our services, you agree to be bound by these Terms.</p>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">2. Use of Services</h2>
        <p className="terms-text">You may use our services for personal, non-commercial purposes only. All rights are reserved to Ethnics, and any unauthorized use may lead to account suspension or termination.</p>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">3. User Responsibilities</h2>
        <ul className="terms-list">
          <li className="terms-list-item">You agree not to misuse our services in any unlawful manner.</li>
          <li className="terms-list-item">You are responsible for all content uploaded to our platform.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">4. Privacy</h2>
        <p className="terms-text">We value your privacy. Please refer to our Privacy Policy for details about how we collect and handle your personal information.</p>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">5. Limitation of Liability</h2>
        <p className="terms-text">Ethnics will not be liable for any damages arising from your use of our website or services. Your use is at your own risk.</p>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">6. Termination</h2>
        <p className="terms-text">We reserve the right to terminate or suspend your account if you violate these Terms of Service or engage in any fraudulent activity.</p>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">7. Changes to Terms</h2>
        <p className="terms-text">We may update these Terms from time to time. Any changes will be posted on this page with an updated "Effective Date." Please review periodically.</p>
      </section>

      <section className="terms-section">
        <h2 className="terms-heading">8. Governing Law</h2>
        <p className="terms-text">These Terms are governed by the laws of the state in which Ethnics operates, without regard to its conflict of law principles.</p>
      </section>

      <p className="terms-contact">If you have any questions about these Terms of Service, please contact us at support@Ethnics.com.</p>
    </div>
  );
};

export default TermsOfService;
