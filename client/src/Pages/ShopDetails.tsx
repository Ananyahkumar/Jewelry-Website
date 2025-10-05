import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define store type for TypeScript
type Store = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  operatingHours: string;
  status: string;
  image: string;
};

const stores: Store[] = [
  {
    name: "Rami Jewelry",
    address: "123 MG Road, Bengaluru, Karnataka, India",
    latitude: 12.9716,
    longitude: 77.5946,
    operatingHours: "9 AM - 8 PM",
    status: "Open",
    image: "https://antdisplay.com/pub/media/magefan_blog/jewelry_store_5_2.jpg",
  },
  {
    name: "Crocker's Jewelers",
    address: "456 Brigade Rd, Bengaluru, Karnataka, India",
    latitude: 12.9756,
    longitude: 77.6050,
    operatingHours: "10 AM - 7 PM",
    status: "Closed",
    image: "https://news.centurionjewelry.com/images/content/articles/Front_Doors_of_Crockers_Jewlers.jpg",
  },
];

const ShopDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Shops</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={store.image} alt={store.name} className="w-full h-84 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
                <p className="text-gray-700 mb-2">{store.address}</p>
                <p className="text-gray-600 mb-2">{store.operatingHours}</p>
                <p className={`font-semibold ${store.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {store.status}
                </p>
                {store.name === 'Rami Jewelry' && (
                  <a href="/rami-jewelry-collection" className="mt-4 inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors font-semibold shadow-md">
                    View Collections
                  </a>
                )}
                {store.name === "Crocker's Jewelers" && (
                  <a href="/.crockers-jewelry-collection" className="mt-4 inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors font-semibold shadow-md">
                    View Collections
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopDetails;
