import { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const createOrder = async (amount, currency = 'INR') => {
    try {
      const response = await fetch('http://localhost:5000/api/order/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });

      if (!response.ok) throw new Error('Failed to create order');

      const data = await response.json();
      setOrder(data);
      return data; // Return the order for further use
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const fetchPaymentDetails = async (paymentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/payment/${paymentId}`
      );

      if (!response.ok) throw new Error('Failed to fetch payment details');

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  return (
    <OrderContext.Provider value={{ order, createOrder, fetchPaymentDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
