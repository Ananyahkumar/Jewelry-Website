import { products } from "@/data/product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
// Import Framer Motion
import { motion } from "framer-motion";

const Collections = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleBuyNow = (product: typeof products[0]) => {
        addToCart({ id: product.id, name: product.title, price: product.price, image: product.productImage });
        navigate('/checkout');
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2, // Staggered animation for each card
                duration: 0.2,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div>
            <Navbar />

            <div className="m-8 text-center">
                <p className="text-4xl">Shop by Events</p>
                <p className="text-md">Offer limited to only till 27/07/2025</p>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="bg-white shadow-md rounded-md p-4"
                            custom={index} // Pass the index for staggered animation
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                        >
                            <img
                                src={product.productImage}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h2 className="text-xl font-bold mt-4">{product.title}</h2>
                            <ul className="mt-2 text-gray-600">
                                {product.description.map((item, i) => (
                                    <li key={i} className="list-disc list-inside">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xl font-semibold text-gray-800 my-2">₹{product.price.toLocaleString()}</p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => handleBuyNow(product)}
                                    className="w-full bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition-colors font-semibold shadow-md">
                                    Buy Now
                                </button>
                                <button
                                    onClick={() => addToCart({ id: product.id, name: product.title, price: product.price, image: product.productImage })}
                                    className="w-full bg-pink-300 text-white rounded-lg px-4 py-2 hover:bg-pink-400 transition-colors font-semibold shadow-md">
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Collections;