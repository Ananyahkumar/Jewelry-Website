import Navbar from "@/components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

interface PartyWearItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const partyWearItems: PartyWearItem[] = [
  {
    id: "party-diamond-choker",
    name: "Diamond Choker",
    image: "https://tse2.mm.bing.net/th/id/OIP.egbjZj9d2uEPWcYFQ8U-1gHaHa?pid=Api&P=0&h=180",
    description: "A stunning diamond choker for any party.",
    price: 25000,
  },
  {
    id: "party-emerald-earrings",
    name: "Emerald Earrings",
    image: "https://tse4.mm.bing.net/th/id/OIP.LYaSQ9IEP-k7pWXxhmFWugHaF3?pid=Api&P=0&h=180",
    description: "Elegant emerald earrings to complete your look.",
    price: 18000,
  },
  {
    id: "party-sapphire-bracelet",
    name: "Sapphire Bracelet",
    image: "https://tse4.mm.bing.net/th/id/OIP.5ucgE0bydXsUXhWr1PDLbAHaHa?pid=Api&P=0&h=180",
    description: "A beautiful sapphire bracelet that sparkles.",
    price: 22000,
  },
  // Add more items as needed
];

const PartyWearCollection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (price: number) => {
    navigate('/payment', { state: { amount: price } });
  };
  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Party Wear Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {partyWearItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 text-center">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <p className="text-xl font-semibold text-gray-800 my-2">₹{item.price.toLocaleString()}</p>
              <div className="flex space-x-2 mt-2">
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
            
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartyWearCollection;

