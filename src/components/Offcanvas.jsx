import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/Offcanvas.css';
import { UserContext } from '../context/UserContext'; // Import UserContext

function Offcanvas() {
  const location = useLocation();
  const { user, authToken, getUserDetails } = useContext(UserContext);

  useEffect(() => {
    if (authToken && !user) {
      getUserDetails(); // Fetch user details if authenticated and no user data is available
    }
  }, [authToken, user, location, getUserDetails]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear local storage
    localStorage.removeItem('username');
    window.location.reload(); // Refresh the page to update UI
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          <h3>Hii!! {user?.name || 'Guest'}</h3> {/* Display the username or 'Guest' */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {authToken ? (
            // Show Logout button if authenticated
            <button
              className="bg-dark text-light w-100 p-2 mb-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            // Show Login/Signup buttons if not authenticated
            <>
              <button className="bg-dark text-light w-100 p-2 mb-2">
                <Link to="/login" className="user-page-link">
                  Login
                </Link>
              </button>
              <button className="bg-dark text-light w-100 p-2 mb-2">
                <Link to="/signin" className="user-page-link">
                  Signup
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Offcanvas;
