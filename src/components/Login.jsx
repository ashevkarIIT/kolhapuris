import React, { useState } from 'react';
import './Styles/LoginStyles.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real application, you would send a request to your backend to verify credentials
    // For this example, we'll simulate a successful login
    try {
      // Simulating an API call
      const response = await simulateLogin(email, password);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        alert('Login successful!');
        navigate('/profile');
        // window.location.reload();
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Simulated login function
  const simulateLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you'd check these credentials against your database
        if (email === 'aishwarya@gmail.com' && password === 'password123') {
          resolve({ success: true, user: { id: 1, email, name: 'Aishwarya Shevkar', username : 'Aishwarya' } });
        } else {
          resolve({ success: false });
        }
      }, 1000); // Simulate network delay
    });
  };

  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
          className='Input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className='Input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit" type="submit">Login</button>
        <p>Don't have an acoount? <Link to="/registration"className="line" >Sign Up</Link></p>

      </form>

    </div>
  );
}

export default Login;