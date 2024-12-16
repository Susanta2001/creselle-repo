import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store user details
  const [authToken, setAuthToken] = useState(null); // To store the JWT token
  const [emailForVerification, setEmailForVerification] = useState(null); // To track email for verification


  const baseUrl = "http://localhost:5000/api/auth";

  // Check for stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Fetch user details if authToken is set
  useEffect(() => {
    if (authToken && !user) {
      getUserDetails();
    }
  }, [authToken]);

  // Step 1: Send verification email
  const verifyEmail = async (name, email, password) => {
    try {
      const response = await fetch(`${baseUrl}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setEmailForVerification(email);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error || result.errors };
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      return { success: false, error: "Something went wrong" };
    }
  };

  // Step 2: Verify code and create user
  const createUser = async (email, code) => {
    try {
      const response = await fetch(`${baseUrl}/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();
      if (response.ok) {
        setAuthToken(result.authToken);
        return { success: true };
      } else {
        return { success: false, error: result.error || result.errors };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, error: "Something went wrong" };
    }
  };


  // Login User
  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setAuthToken(result.authToken);
        console.log("User logged in successfully!");
        return { success: true, authToken: result.authToken };
      } else {
        console.error(result.error || result.errors);
        return { success: false, error: result.error || result.errors };
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      return { success: false, error: "Something went wrong" };
    }
  };

  // Get User Details
  const getUserDetails = async () => {
    try {
      if (!authToken) {
        console.error("No token available. Please log in.");
        return { success: false, error: "Not authenticated" };
      }

      const response = await fetch(`${baseUrl}/getuser`, {
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result);
        return { success: true, user: result };
      } else {
        console.error(result.error || result.errors);
        return { success: false, error: result.error || result.errors };
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { success: false, error: "Something went wrong" };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authToken,
        emailForVerification,
        verifyEmail,
        createUser,
        loginUser,
        getUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
