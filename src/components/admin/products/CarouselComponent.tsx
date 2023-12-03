import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaAngleDown } from "react-icons/fa";

interface CarouselComponentProps {
  images: string[];
}
const CarouselComponent = ({ images }: CarouselComponentProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000); // Ganti 3000 dengan interval yang Anda inginkan (dalam milidetik)

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  return (
    <div className="relative">
      <div className="w-full h-96 relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`absolute w-full h-full transform transition-transform duration-500 ${
              index === currentImageIndex ? "scale-100" : "scale-0"
            }`}
          />
        ))}
      </div>
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2  text-white rounded-l-md"
      >
        <FaAngleLeft size={40} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2  text-white rounded-r-md"
      >
        <FaAngleRight size={40} />
      </button>
    </div>
  );
};

export default CarouselComponent;
