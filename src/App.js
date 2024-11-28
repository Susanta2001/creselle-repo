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
import {UserProvider} from './context/UserContext';
import Signin from '../src/components/Signin';
import Login from '../src/components/Login';
import ProductTemplate from './components/ProductTemplate';

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
    },
    {
      path:'/signin',
      element:(
        <>
        <Signin/>
        </>
      )
    },
    {
      path:'/login',
      element:(
        <>
        <Login/>
        </>
      )
    },
    {
      path: '/:id',
      element:(
        <>
        <Navbar/>
        <ProductTemplate/>
        <Footer/>
        </>
      )
    } 
  ]);

  return (
    <>
    <UserProvider>

    <ProductProvider>
      {isLoading ? (
        <Preloader /> // Show Preloader while loading
      ) : (
        <RouterProvider router={router} />
      )}
      </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
