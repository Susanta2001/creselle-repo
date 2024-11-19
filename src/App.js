import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import ProductPage from '../src/components/Product-page'
import Store from '../src/components/Store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Preloader from './components/Preloader';
import { useEffect, useState } from 'react';
import { ProductProvider } from './context/ProductContext';

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
          <Footer/>
        </>
      ),
    },
    {
      path:'/addProduct',
      element:(
        <>
        <ProductPage/>
        <Footer/>
        </>
      )
    },
    {
      path:'/store',
      element:(
        <>
        <Navbar/>
        <Store/>
        <Footer/>
        </>
      )
    }
  ]);

  return (
    <>
    <ProductProvider>
      {isLoading ? (
        <Preloader /> // Show Preloader while loading
      ) : (
        <RouterProvider router={router} />
      )}
      </ProductProvider>
    </>
  );
}

export default App;
