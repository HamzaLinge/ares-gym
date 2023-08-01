/* eslint-disable @next/next/no-img-element */
// ImageTransition.js

import React, { useState, useEffect } from "react";

const ImageTransition = () => {
  const [imageIndexes, setImageIndexes] = useState([false, false, false]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [arrIdTimeOut, setArrIdTimeOut] = useState({
    stopPreviousAnimation: undefined,
    startNextAnimation: undefined,
  });

  function startAnimation() {
    let copyOne = [...imageIndexes];
    const indexCurrentActiveImage = activeImageIndex;
    copyOne[indexCurrentActiveImage] = true;
    setImageIndexes((prev) => copyOne);

    // if(arrIdTimeOut.stopPreviousAnimation) clear

    const idTimeOutStopPreviousAnimation = setTimeout(() => {
      let copyTwo = [...imageIndexes];
      copyTwo[indexCurrentActiveImage] = false;
      setImageIndexes((prev) => copyTwo);
    }, 5000);

    const idTimeOutStartNextAnimation = setTimeout(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % 2);
      // startAnimation();
    }, 4000);

    setArrIdTimeOut((prev) => ({
      stopPreviousAnimation: idTimeOutStopPreviousAnimation,
      startNextAnimation: idTimeOutStartNextAnimation,
    }));
  }

  useEffect(() => {
    const arrIdTimeOut = startAnimation();
    // return () => arrIdTimeOut.map((idTimeOut) => clearTimeout(idTimeOut));
  }, [activeImageIndex]);

  // useEffect(() => {
  //   const activeIntervalId = setInterval(() => {
  //     setActiveImageIndex((prevIndex) => (prevIndex + 1) % 2);
  //   }, 5000);

  //   return () => clearInterval(activeIntervalId);
  // }, []);

  useEffect(() => {
    console.log(activeImageIndex);
  }, [activeImageIndex]);

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 overflow-hidden bg-black">
      <img
        src="/images/banner/img-1.jpg"
        alt="First Image"
        className={`scale-120 absolute left-0 top-0 h-full w-full opacity-0 brightness-50 ${
          imageIndexes[0] ? "animate-zoom-out" : ""
        }`}
      />
      <img
        src="/images/banner/img-2.jpg"
        alt="Second Image"
        className={`scale-120 absolute left-0 top-0 h-full w-full opacity-0 brightness-50 ${
          imageIndexes[1] ? "animate-zoom-out" : ""
        }`}
      />
    </div>
  );
};

export default ImageTransition;
