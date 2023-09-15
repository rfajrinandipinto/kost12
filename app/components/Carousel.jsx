// components/Carousel.js
import { useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-screen-md mx-auto">
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      <div className="carousel-controls absolute top-1/2 transform -translate-y-1/2">
        <button onClick={prevSlide} className="carousel-control">
          Previous
        </button>
        <button onClick={nextSlide} className="carousel-control">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
