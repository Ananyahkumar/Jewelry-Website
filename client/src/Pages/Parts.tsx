import { product3 } from "@/data/product3";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Theatrical Jewelry Collection</h1>
        <p className="text-lg text-gray-600">
          Discover the perfect jewelry pieces to transform your dramatic performances.
        </p>
      </div>

      {/* Browse by Category */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product3.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-500 mt-2">{item.description}</p><br></br>
              <Link to="/collections/head-jewelry">
                <button className="bg-pink-600 text-white px-4 py-2 rounded">
                  Explore Collection
                </button>
              </Link>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;