import React, { createContext, useState } from 'react';

// Create a context for cart
const CartContext = createContext();

// CartProvider component
const CartProvider = ({ children }) => {
    // State for storing all cart products
    const [allCartProducts, setAllCartProducts] = useState([]);

    // Function to fetch all cart products for the logged-in user
    const getCartProducts = async () => {
        try {
            const authToken = localStorage.getItem('token'); // Example: Get the token from localStorage
            if (!authToken) {

                console.error('No auth-token found!');
                return;
            }

            const response = await fetch('http://localhost:5000/api/cart/allCartProducts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken, // Pass the token in the headers
                },
            });

            const json = await response.json();
            if (response.ok) {
                setAllCartProducts(json.cart.items || []); // Safely access the items
            } else {
                console.error('Error fetching cart:', json.message);
            }
        } catch (error) {
            console.error('Error fetching user cart products:', error);
        }
    };
 // Function to update cart products for the logged-in user
    const updateProductQuantity = async (productId, newQuantity) => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/cart/updateQuantity', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify({ productId, quantity: newQuantity }),
            });
    
            const json = await response.json();
            if (response.ok) {
                console.log('Cart updated:', json);
                getCartProducts(); // Refresh the cart
            } else {
                console.error('Error updating quantity:', json.message);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
     // Function to delete cart products for the logged-in user
    const removeProductFromCart = async (productId) => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/cart/removeProduct', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify({ productId }),
            });
    
            const json = await response.json();
            if (response.ok) {
                console.log('Product removed:', json);
                getCartProducts(); // Refresh the cart
            } else {
                console.error('Error removing product:', json.message);
            }
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };
    
    return (
        <CartContext.Provider value={{ allCartProducts, getCartProducts, updateProductQuantity, removeProductFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
