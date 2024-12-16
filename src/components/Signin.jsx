import React, { useState, useContext } from 'react';
import '../assets/css/Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Import UserContext

function SignIn() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const { emailForVerification, verifyEmail, createUser } = useContext(UserContext); // Access methods from UserContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await verifyEmail(credentials.name, credentials.email, credentials.password);
      if (result.success) {
        alert(result.message);
        setIsVerifying(true);
      } else {
        setErrorMessage(result.error || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('Failed to send verification email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await createUser(emailForVerification, verificationCode);

      if (result.success) {
        alert('Account created successfully!');
        navigate('/login');
      } else {
        setErrorMessage(result.error || 'Invalid verification code.');
      }
    } catch (error) {
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
        {!isVerifying ? (
          <form className="d-flex flex-column" onSubmit={handleVerify} style={{ width: '80%', alignSelf: 'center' }}>
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
              {isLoading ? 'Verifying...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form className="d-flex flex-column" onSubmit={handleSubmit} style={{ width: '80%', alignSelf: 'center' }}>
            <p className="sl-code">Verification Code</p>
            <input
              type="text"
              name="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button id="signinB" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Submit Code'}
            </button>
          </form>
        )}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignIn;
