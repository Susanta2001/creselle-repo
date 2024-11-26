import React, { useState } from 'react';
import '../assets/css/Signin.css';
import { Link, useNavigate } from 'react-router-dom';

function Sign() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful sign-in, redirect to the login page
        alert('Account created successfully!');
        navigate('/login');
      } else {
        setErrorMessage(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Failed to create account. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-in-main d-flex align-items-center">
      <div className="sign-in-inner d-flex flex-column justify-content-around">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h2 style={{ color: 'white' }}>Sign In</h2>
          <span>
            Already a user?
            <Link to="/login" className="mx-2">
              Log in
            </Link>
          </span>
        </div>
        <form className="d-flex flex-column" onSubmit={handleSubmit} style={{ width: '80%', alignSelf: 'center' }}>
          <p className="sl-user">Username</p>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
          <p className="sl-email">Email</p>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <p className="sl-password">Password</p>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button id="signinB" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Sign;
