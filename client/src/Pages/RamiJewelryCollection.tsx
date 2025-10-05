import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const collections = [
  {
    id: 'rami-diamond-necklace',
    name: 'Diamond Necklace',
    description: 'An exquisitely crafted diamond necklace, perfect for special occasions.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.0IKCi9byqKELtgDiCFPMjAHaHJ?pid=Api&P=0&h=180',
    price: 15000,
  },
  {
    id: 'rami-sapphire-ring',
    name: 'Sapphire Ring',
    description: 'A stunning sapphire ring with a classic design.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.x_mk5pCNH5Do0tG6kEZlMgHaHa?pid=Api&P=0&h=180',
    price: 8500,
  },
  {
    id: 'rami-emerald-earrings',
    name: 'Emerald Earrings',
    description: 'Elegant emerald earrings that add a touch of sophistication.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.59O5umCCt-0UGNN_wiD4vQHaHa?pid=Api&P=0&h=180',
    price: 12000,
  },
  {
    id: 'rami-gold-bracelet',
    name: 'Gold Bracelet',
    description: 'A timeless gold bracelet, perfect for everyday wear.',
    image: 'https://tse3.mm.bing.net/th/id/OIP.5_9mVfNv-A5GyK9rLnWxUgHaHa?pid=Api&P=0&h=180',
    price: 5000,
  },
];

const RamiJewelryCollection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = (item: typeof collections[0]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    navigate('/checkout');
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Rami Jewelry Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-xl font-semibold text-gray-800 mb-4">₹{item.price.toLocaleString()}</p>
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleBuyNow(item)} 
                    className="w-full bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition-colors font-semibold shadow-md">
                    Buy Now
                  </button>
                  <button 
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })} 
                    className="w-full bg-pink-300 text-white rounded-lg px-4 py-2 hover:bg-pink-400 transition-colors font-semibold shadow-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RamiJewelryCollection;
