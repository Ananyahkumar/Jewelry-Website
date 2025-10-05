import Navbar from "@/components/Navbar";
import Category from "./Category";
import Parts from "./Parts"
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/Carousel";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
const Home = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, [navigate]);
    return (
        <div>
            <Navbar />
            <ImageCarousel />
            <br />
            <Category />
            <br />
            <Parts />
            
            <br />
            <Footer />

        </div>
    );
};

export default Home;