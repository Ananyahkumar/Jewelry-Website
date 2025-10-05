import product4 from "@/data/product4"
import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/Carousel";
import RentalProductCard from '@/components/RentalProductCard';
import Footer from "@/components/Footer";

const Second = () => {
    return (
        <div>
            <Navbar />
            <ImageCarousel />
            <br />
            <div className="container mx-auto p-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Jewelry Rental @Trending</h1>
                    <p className="text-gray-500">Discover our exquisite rental collection</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {product4.map((product) => (
                        <RentalProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Second;