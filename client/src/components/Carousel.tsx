import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles

const ImageCarousel: React.FC = () => {
    return (
      
      
      
      
      
      
      
      <div className="carousel-container h-64">
            <Carousel
                showThumbs={false}
                infiniteLoop
                useKeyboardArrows
                autoPlay
                interval={3000}
                showStatus={false}
                className="w-full"
            >

                <div>
                    <img
                        src="img (18).jpg"
                        alt="Slide 2"
                        className="h-[40vh] object-cover"
                    />

                </div>
                <div>
                    <img
                        src="img (17).jpg"
                        alt="Slide 3"
                        className="h-[40vh] object-cover"
                    />



                </div>

                <div>
                    <img
                        src="carousel.jpg"
                        alt="Slide 4"
                        className="h-[40vh] object-cover"
                    />

                </div>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;