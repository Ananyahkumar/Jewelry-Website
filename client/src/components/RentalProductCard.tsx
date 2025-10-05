import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

interface RentalProductCardProps {
  product: Product;
}

const RentalProductCard: React.FC<RentalProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rentalDays, setRentalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product.price);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end > start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRentalDays(diffDays);
        setTotalPrice(product.price * diffDays);
      } else {
        setRentalDays(0);
        setTotalPrice(product.price);
      }
    }
  }, [startDate, endDate, product.price]);

  const handleAddToCart = () => {
    if (rentalDays > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: totalPrice,
        image: product.image,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
        rentalDays: rentalDays,
      });
    } else {
      alert('Please select valid start and end dates for rental.');
    }
  };
  
  const handleBuyNow = () => {
    if (rentalDays > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: totalPrice,
        image: product.image,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
        rentalDays: rentalDays,
      });
      navigate('/checkout');
    } else {
      alert('Please select valid start and end dates for rental.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-500 mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-4">
        ₹{product.price.toLocaleString()} / day
      </p>

      <div className="mt-4 space-y-2">
        <div>
          <label htmlFor={`start-date-${product.id}`} className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id={`start-date-${product.id}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor={`end-date-${product.id}`} className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id={`end-date-${product.id}`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {rentalDays > 0 && (
        <div className="mt-4 text-center">
          <p className="font-semibold">Rental Duration: {rentalDays} days</p>
          <p className="text-xl font-bold">Total: ₹{totalPrice.toLocaleString()}</p>
        </div>
      )}

      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleBuyNow}
          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="w-full bg-pink-300 text-white rounded-lg px-4 py-2 hover:bg-pink-400 transition-colors font-semibold shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RentalProductCard;
