import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import product4 from "@/data/product4";

const BuyNow = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!id) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Invalid Product ID</h1>
      </div>
    );
  }

    const product = product4.find((item) => item.id.toString() === id); // Find the matching product

  if (!product) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Product Not Found</h1>
      </div>
    );
  }

    const handleCheckout = () => {
    if (!product) return;
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-6">${product.price.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="bg-pink-500 text-white w-full py-2 rounded-lg hover:bg-pink-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default BuyNow;