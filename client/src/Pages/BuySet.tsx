import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const BuySet = () => {
  const { id } = useParams(); // Get ID from route param
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Safe matching
  const product = products.find((item) => `${item.id}` === `${id}`);

  // Debug logs
  console.log("Route ID:", id);
  console.log("Matched product:", product);

  if (!product) {
    return (
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

      const handleBuyNow = () => {
    if (!product) return;

    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.productImage,
    });
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto">
        <img
          src={product.productImage}
          alt={product.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.warn("Image failed to load:", product.productImage);
            target.onerror = null;
            target.src = "/assets/placeholder.jpg"; // Ensure this image is in public/assets/
          }}
          className="w-full h-64 object-cover rounded-md mb-4"
        />

        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                <p className="text-lg font-semibold text-gray-800 mb-2">
          Price:{" "}
          <span className="font-bold text-pink-600">
            ₹{product.price.toLocaleString() || "Not Available"}
          </span>
        </p>

        <ul className="text-gray-600 mb-4">
          {product.description.map((item, i) => (
            <li key={i} className="list-disc list-inside">
              {item}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleBuyNow}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default BuySet;
