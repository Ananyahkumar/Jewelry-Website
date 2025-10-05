import Navbar from "@/components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

interface HeadJewelryItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const headJewelryItems: HeadJewelryItem[] = [
  {
    id: "head-regal-crown",
    name: "Regal Crown",
    image: "https://tse3.mm.bing.net/th/id/OIP.IAW9JFVzswoOA5c2wfwiqAHaHa?pid=Api&P=0&h=180",
    description: "An ornate crown for royal elegance.",
    price: 35000,
  },
  {
    id: "head-crystal-tiara",
    name: "Crystal Tiara",
    image: "https://tse1.mm.bing.net/th/id/OIP.wPwk36DRjQIRwYTPyLD-uwHaHK?pid=Api&P=0&h=180",
    description: "Sparkling tiara perfect for theatrical queens.",
    price: 15000,
  },
  {
    id: "head-golden-headdress",
    name: "Golden Headdress",
    image: "https://tse1.mm.bing.net/th/id/OIP.viFMl2FDpU5N6K-1tRHfZQHaHa?pid=Api&P=0&h=180",
    description: "Majestic golden headdress with gemstones.",
    price: 45000,
  },
  // Add more items as needed
];

const HeadJewelryCollection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (price: number) => {
    navigate('/payment', { state: { amount: price } });
  };
  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Head Jewelry Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {headJewelryItems.map((item) => (
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

export default HeadJewelryCollection;
