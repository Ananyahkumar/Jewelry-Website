import { useState, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import Navbar from "@/components/Navbar";

// Define store type for TypeScript
type Store = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  operatingHours: string;
  status: string;
};

const Location = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // for Vite
  });

  const [stores] = useState<Store[]>([ 
  {
    name: "Rami Jewelry",
    address: "123 MG Road, Bengaluru, Karnataka, India",
    latitude: 12.9716,   // ✅ Bengaluru
    longitude: 77.5946,
    operatingHours: "9 AM - 8 PM",
    status: "Open",
  },
  {
    name: "Crocker's Jewelers",
    address: "456 Brigade Rd, Bengaluru, Karnataka, India",
    latitude: 12.9756,   // ✅ Nearby location
    longitude: 77.6050,
    operatingHours: "10 AM - 7 PM",
    status: "Closed",
  },
]);


  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const defaultCenter = useMemo(() => ({ lat: 12.9716, lng: 77.5946 }), []);
  const mapContainerStyle = useMemo(() => ({
    width: "100%",
    height: "600px",
  }), []);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="md:w-1/3 bg-white p-4 overflow-y-auto max-h-[600px]">
          <h2 className="text-2xl font-bold mb-4">Nearby Jewelry Stores</h2>
          {stores.map((store, index) => (
            <div
              key={index}
              className={`border-b pb-4 mb-4 cursor-pointer ${
                selectedStore?.name === store.name ? "bg-gray-100" : ""
              } hover:bg-gray-200`}
              onClick={() => setSelectedStore(store)}
            >
              <h3 className="text-lg font-bold">{store.name}</h3>
              <p>{store.address}</p>
              <p>{store.operatingHours}</p>
              <p>Status: {store.status}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="md:w-2/3" style={{ height: "600px" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={
              selectedStore
                ? { lat: selectedStore.latitude, lng: selectedStore.longitude }
                : defaultCenter
            }
            onLoad={(map) => console.log("Map loaded", map)}
          >
            {stores.map((store, index) => (
              <Marker
                key={index}
                position={{ lat: store.latitude, lng: store.longitude }}
                onClick={() => setSelectedStore(store)}
              />
            ))}

            {selectedStore && (
              <InfoWindow
                position={{
                  lat: selectedStore.latitude,
                  lng: selectedStore.longitude,
                }}
                onCloseClick={() => setSelectedStore(null)}
              >
                <div>
                  <h3 className="font-bold">{selectedStore.name}</h3>
                  <p>{selectedStore.address}</p>
                  <p>Hours: {selectedStore.operatingHours}</p>
                  <p>Status: {selectedStore.status}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Location;
