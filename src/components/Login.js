import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use navigate for routing

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !password) {
      setErrorMessage('All fields are required!');
      return;
    }

    try {
      // Send a POST request to the login API
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        email,
        password,
      });

      // Handle successful login
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      console.log('Response data:', response.data);

      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to createProduct page
      navigate('/createProduct'); // Use navigate for redirection
    } catch (error) {
      // Handle login failure
      console.log(error);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Login failed. Please try again.'
      );
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
      }}
    >
      <h1>Login Form</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Username Field */}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', margin: '10px 0' }}
          />
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', margin: '10px 0' }}
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', margin: '10px 0' }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Login
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          <p>{successMessage}</p>
        </div>
      )}

      {/* Link to Signup */}
      <div style={{ marginTop: '20px' }}>
        <p>
          Want to create a new user? <a href="/signup">Click here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
