import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUser = async () => {
      // In a real app, you'd make an API call here
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      } else {
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, you'd send an API request to update the user profile
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('user', JSON.stringify(user));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
          
      {isEditing ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
          <h2>Edit Profile</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>        
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="save" type="submit">Save Changes</button>
          <button className="cancel" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className='login-form'>
          <h2>User Profile</h2>  
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <button className="submit" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}
export default ProfileEdit;