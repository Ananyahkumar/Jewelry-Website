import { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  typeOfJewelry: string;
  budgetRange: string;
  description?: string; // Make description optional
}

export default function YourOrders() {
  // State to hold orders fetched from the backend
  const [orders, setOrders] = useState<Order[]>([]);

  // Function to fetch data from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders'); // Backend endpoint
      setOrders(response.data); // Assuming the data is an array of orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // useEffect to call fetchOrders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <p className="text-lg">
                <strong>Type of Jewelry:</strong> {order.typeOfJewelry}
              </p>
              <p className="text-lg">
                <strong>Budget Range:</strong> {order.budgetRange}
              </p>
              {order.description && (
                <p className="text-lg">
                  <strong>Description:</strong> {order.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}