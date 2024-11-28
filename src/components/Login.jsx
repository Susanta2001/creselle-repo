import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const { email, password } = credentials;

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        alert('Account logged in successfully');

        // Save token based on "Remember Me"
        if (rememberMe) {
          localStorage.setItem('token', result.authToken);
        } else {
          sessionStorage.setItem('token', result.authToken);
        }

        navigate('/');
      } else {
        setErrorMessage(result.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error logging in account', error);
      setErrorMessage('Failed to login account. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-main d-flex align-items-center text-light">
      <div className="sign-in-inner d-flex flex-column justify-content-around">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <h2 style={{ color: 'white' }}>Login</h2>
          <span className="text-dark">
            Not a user?
            <Link to="/signin" className="ms-2">Sign in</Link>
          </span>
        </div>
        <form className="d-flex flex-column" style={{ width: '80%', alignSelf: 'center' }} onSubmit={handleSubmit}>
          <p className="useroremail">Username or Email</p>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <p className="pass">Password</p>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <p className="rememberMe">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            Remember me
          </p>
          <button id="signinB" type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className="d-flex justify-content-center flex-column align-items-center">
          <p>
            <a style={{ color: 'black' }} href="/">Forgot your password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
