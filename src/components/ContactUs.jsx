import React, { useState } from 'react';
import './Styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual form submission logic (e.g., API call)
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' }); // Clear form after submission
  };

  return (
    <div className="contact-container">
      <h1 className="contact-heading">We'd Love to Hear From You!</h1>
      <p className="contact-description">
        Whether you have a question or just want to say hello, we're here to help.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      <div className="contact-info">
        <p className="contact-info-heading">Alternatively, you can reach us at:</p>
        <div className="contact-methods">
          <p className="contact-method">
            <i className="fas fa-envelope"></i> support@ethnics.com
          </p>
          <p className="contact-method">
            <i className="fas fa-phone"></i> +1 (234) 56-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
