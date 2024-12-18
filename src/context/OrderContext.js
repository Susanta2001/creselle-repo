import React, { createContext, useState, useEffect } from 'react';

// Create Order Context
const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [authToken, setAuthToken] = useState(null); // To store the JWT token

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Function to create a new order
  const createOrder = async ({ items, totalAmount, address }) => {
    if (!authToken) throw new Error('Authentication token is missing.');
    try {
      const response = await fetch('http://localhost:5000/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({
          // user: userId,
          items,
          totalAmount,
          address,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order.');
      }

      const data = await response.json();
      setOrders((prevOrders) => [...prevOrders, data.order]); // Add new order to state
      return data.order;
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw error;
    }
  };

  // Function to fetch all orders for a specific user
  const getOrdersByUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/myorders`, {
        method: 'GET',
        headers: {
          "auth-token":`${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders.');
      }

      const data = await response.json();
      setOrders(data.orders); // Update state with fetched orders
      return data.orders;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      throw error;
    }
  };

  // Function to fetch a specific order by ID
  const getOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Order not found.');
      }

      const data = await response.json();
      return data.order; // Return the specific order
    } catch (error) {
      console.error('Error fetching order by ID:', error.message);
      throw error;
    }
  };

  // Function to update the status of an order
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status.');
      }

      const data = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: data.order.status } : order
        )
      ); // Update the order status in state
      return data.order;
    } catch (error) {
      console.error('Error updating order status:', error.message);
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{orders,createOrder,getOrdersByUser,getOrderById,updateOrderStatus,}}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
