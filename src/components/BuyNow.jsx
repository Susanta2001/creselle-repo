import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

function BuyNow() {
  const { createOrder } = useContext(OrderContext);

  const handleSubmit = async () => {
    try {
      const items = [
        { product: 'Sample Product 1', quantity: 2, price: 20 },
        { product: 'Sample Product 2', quantity: 1, price: 15 },
      ];
      const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

      const order = await createOrder({
        items,
        totalAmount,
        address: '123 Sample 2 Street, Sample City',
      });
      console.log('Order created:', order);
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  return (
    <div className="buy-now-div">
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default BuyNow;
