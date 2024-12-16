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
import {CartProvider} from './context/CartContext'
import {OrderProvider} from './context/OrderContext'
import Signin from '../src/components/Signin';
import Login from '../src/components/Login';
import ProductTemplate from './components/ProductTemplate';
import AddToCart from './components/AddToCart';
import BuyNow from './components/BuyNow';

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
    },
    {
      path:'/addToCart',
      element:(
        <>
          <Navbar/>
          <AddToCart/>
          <Footer/>
        </>
      )
    }, 
    {
      path:'/order-page',
      element:(
        <>
          <Navbar/>
          <BuyNow/>
          <Footer/>
        </>
      )
    } 
  ]);

  return (
    <>
    <UserProvider>
    <CartProvider>
    <ProductProvider>
      <OrderProvider>
      {isLoading ? (
        <Preloader /> // Show Preloader while loading
      ) : (
        <RouterProvider router={router} />
      )}
      </OrderProvider>
      </ProductProvider>
      </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
