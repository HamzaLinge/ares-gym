/* eslint-disable @next/next/no-img-element */
// ImageTransition.js

import React, { useState, useEffect } from "react";

const ImageTransition = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 overflow-hidden">
      <img
        src="/images/banner/img-1.jpg"
        alt="First Image"
        className={`absolute left-0 top-0 h-full w-full animate-zoom-out brightness-50 transition-opacity duration-1000 ${
          activeImageIndex === 0 ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src="/images/banner/img-2.jpg"
        alt="Second Image"
        className={`absolute left-0 top-0 h-full w-full animate-zoom-out brightness-50 transition-opacity duration-1000 ${
          activeImageIndex === 1 ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageTransition;
