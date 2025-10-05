import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Intro = () => {
    return (
        <div>
            {/* Hero Section */}
            <Navbar />
            <div className="grid grid-cols-2 my-8 mx-4 h-[80vh]">
                <div className="flex items-center justify-center m-4">
                    <div>
                        <p className="text-6xl">Timeless Beauty in Every Piece</p>
                        <p className="text-2xl">Discover our exquisite collection of handcrafted jewelry, where elegance meets artistry in every design.</p>
                        <Link to="/collection">
                            <Button className="my-4 p-4 bg-pink-500">Explore Collection</Button></Link>
                        <Link to="/login">
                            <Button className="my-4 mx-4 p-4 bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white">Sign in</Button>
                        </Link>
                    </div>

                </div>
                <div className="text-center m-8">
                    <img src="1.png" alt="" />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Jewelry Accessing System
                </h2>
                <p className="text-lg text-center text-gray-600 mb-10">
                    Every Piece Of Jewelry Tells A Story
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xl bg-gray-300 p-8">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Craftsmanship</h3>
                        <p className="text-gray-600">Expert artisans with decades of experience</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
                        <p className="text-gray-600">Finest materials and exacting standards</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Design</h3>
                        <p className="text-gray-600">Unique pieces that tell your story</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Heritage</h3>
                        <p className="text-gray-600">Years of excellence</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Intro;