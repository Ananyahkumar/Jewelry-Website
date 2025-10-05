import { motion } from "framer-motion";
import { products2 } from "@/data/products2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import allProducts from "@/data/allProducts";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

export default function Category() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to sync search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);
  }, [location]);

  // Effect to update search results when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleBuyNow = (price: number) => {
    navigate('/payment', { state: { amount: price } });
  };

  return (
    <div>
      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Search for Products</h1>
          <input
            type="text"
            placeholder="Search for jewelry..."
            className="w-full max-w-lg p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>

        {/* Search Results or Categories */}
        {searchQuery ? (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((product: Product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-500 mt-2">{product.description}</p>
                    <p className="text-lg font-semibold mt-4">₹{product.price.toLocaleString()}</p>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleBuyNow(product.price)}
                        className="w-full bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition-colors font-semibold shadow-md"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                        className="w-full bg-pink-300 text-white rounded-lg px-4 py-2 hover:bg-pink-400 transition-colors font-semibold shadow-md"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No products found for "{searchQuery}".</p>
              )}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 m-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, staggerChildren: 0.2 },
                },
              }}
            >
              {products2.map((category: { name: string; image: string; description: string }, index: number) => {
                const categoryCard = (
                  <motion.div
                    className="bg-white shadow-md rounded-lg p-2 text-center hover:shadow-lg cursor-pointer "
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 rounded-md mb-4 hover:scale-105 transition-all duration-200 ease-in-out "
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-gray-500 mt-2">{category.description}</p>
                  </motion.div>
                );

                if (category.name === "Indian Dancers") {
                  return (
                    <Link to="/collection" key={index}>
                      {categoryCard}
                    </Link>
                  );
                } else if (category.name === "Customisation") {
                  return (
                    <Link to="/customDesign" key={index}>
                      {categoryCard}
                    </Link>
                  );
                } else if (category.name === "Party Wear") {
                  return (
                    <Link to="/party-wear-collection" key={index}>
                      {categoryCard}
                    </Link>
                  );
                } else {
                  return <div key={index}>{categoryCard}</div>;
                }
              })}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}