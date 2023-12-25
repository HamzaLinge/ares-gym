/* eslint-disable @next/next/no-img-element */
// ImageTransition.js

import React, { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

const pathsImages = ["/images/banner/img1.jpg", "/images/banner/img2.jpg"];

const ImageTransition = () => {
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [allow, setAllow] = useState(false);

  function initImages() {
    const orientation =
      window.innerWidth <= parseInt(fullConfig.theme.screens.sm.split("px")[0])
        ? "vertical"
        : "horizontal";
    const initialImages = pathsImages.map((pathImg) => {
      return {
        path: `${pathImg.split(".")[0]}.${orientation}.${
          pathImg.split(".")[1]
        }`,
        display: false,
      };
    });
    setImages((prev) => initialImages);
  }

  function setPathsImages(e) {
    const orientation =
      e.target.outerWidth <=
      parseInt(fullConfig.theme.screens.sm.split("px")[0])
        ? "vertical"
        : "horizontal";
    const newImages = images.map(({ path, display }) => {
      return {
        path: `${path.split(".")[0]}.${orientation}.${path.split(".")[2]}`,
        display,
      };
    });
    setImages((prev) => newImages);
  }

  useEffect(() => {
    initImages();
  }, []);

  useEffect(() => {
    addEventListener("resize", setPathsImages);
    return () => removeEventListener("resize", setPathsImages);
  }, [images.length]);

  function startAnimation() {
    let copyImagesOne = [...images];
    copyImagesOne[activeImageIndex].display = true;
    setImages((prev) => copyImagesOne);

    return setTimeout(() => {
      let copyImagesTwo = [...images];
      copyImagesTwo[activeImageIndex].display = false;
      setImages((prev) => copyImagesTwo);
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
  }

  useEffect(() => {
    if (images.length === 0) return;
    const idTimeOutAnimation = startAnimation();
    return () => clearTimeout(idTimeOutAnimation);
  }, [activeImageIndex, images.length]);

  return (
    <div
      className={
        "absolute bottom-0 left-0 right-0 top-0 -z-10 flex items-center justify-center overflow-hidden bg-black"
      }
    >
      {images.length > 0
        ? images.map(({ path, display }) => (
            <img
              key={path}
              src={path}
              alt={path}
              className={`scale-120 absolute min-h-full min-w-full object-contain opacity-0 brightness-50 ${
                display ? "animate-zoom-out" : ""
              }`}
            />
          ))
        : undefined}
    </div>
  );
};

export default ImageTransition;
