import React from "react";
import ImageTransition from "./ImageTransition";

function Banner() {
  return (
    <div
      className={
        "relative flex h-screen w-full flex-col items-center justify-end"
      }
    >
      <h1
        className={
          "mx-5 mb-20 grid grid-cols-2 gap-1 text-[5vw] text-yellow-400 md:mx-10 md:text-[4vw]"
        }
      >
        <span className={"col-span-2 md:col-span-1"}>Libérez le Guerrier</span>
        <span>qui Sommeille</span>
        <span>en Vous.</span>
      </h1>
      <ImageTransition />
    </div>
  );
}

export default Banner;
