import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const collections = [
  {
    id: 'crocker-vintage-locket',
    name: 'Vintage Locket',
    description: 'A beautiful vintage locket with intricate detailing.',
    image: 'https://images.unsplash.com/photo-1610495147435-7a2d385151c7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 7500,
  },
  {
    id: 'crocker-pearl-necklace',
    name: 'Pearl Necklace',
    description: 'A classic pearl necklace that exudes elegance.',
    image: 'https://images.unsplash.com/photo-1593021422819-2b1b01053e1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 9200,
  },
  {
    id: 'crocker-ruby-earrings',
    name: 'Ruby Earrings',
    description: 'Stunning ruby earrings that make a bold statement.',
    image: 'https://images.unsplash.com/photo-1611892985422-a9b78e5535b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11500,
  },
  {
    id: 'crocker-silver-charm-bracelet',
    name: 'Silver Charm Bracelet',
    description: 'A charming silver bracelet that can be personalized with your favorite charms.',
    image: 'https://images.unsplash.com/photo-1611652022417-a55445a6b437?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 4800,
  },
];

const CrockersJewelryCollection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (price: number) => {
    navigate('/payment', { state: { amount: price } });
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Crocker's Jewelers Collection</h1>
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
                    onClick={() => handleBuyNow(item.price)} 
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

export default CrockersJewelryCollection;
