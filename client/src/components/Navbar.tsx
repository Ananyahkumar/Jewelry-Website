import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from 'lucide-react';
import React, { useState } from "react";
const frameImage = "/Frame.png";

const Navbar = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/category?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };
    return (

        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src={frameImage} alt="Logo" className="m-2" />
                    <span className="text-blue-600 text-xl font-bold">JewelCraft</span>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-10">
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/collection" className="text-gray-700 hover:text-blue-600">
                        Collections
                    </Link>
                    {/*<Link to="/yourorders" className="text-gray-700 hover:text-blue-600">Your Orders</Link>*/}
                    <Link to="/shop-details" className="text-gray-700 hover:text-blue-600">Our Shops</Link>
                    <Link to="/Location" className="text-gray-700 hover:text-blue-600">
                        Locations
                    </Link>
                    <Link to="/customDesign" className="text-gray-700 hover:text-blue-600">
                        Customize Jewellery Design
                    </Link>
                    <Link to="/second" className="text-gray-700 hover:text-blue-600">
                        Rental a Jewellery Design
                    </Link>
                    <button onClick={logout} className="text-gray-700 hover:text-blue-600">
                        Logout
                    </button>
                </div>

                {/* Icons Section */}
                <div className="flex items-center space-x-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-1 bg-transparent focus:outline-none w-32 transition-all duration-300 focus:w-48"
                        />
                        <button type="submit" className="text-gray-600 hover:text-blue-600 p-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                    </form>
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;