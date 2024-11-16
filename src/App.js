import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Preloader from './components/Preloader';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data or assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
  ]);

  return (
    <>
      {isLoading ? (
        <Preloader /> // Show Preloader while loading
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
