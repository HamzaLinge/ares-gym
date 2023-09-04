import React from "react";
import ImageTransition from "./ImageTransition";

function Banner() {
  return (
    <section
      className={
        "relative flex h-screen w-full flex-col items-center justify-end"
      }
    >
      <h1
        className={
          "mx-5 mb-20 grid grid-cols-2 gap-1 self-start font-dela-gothic-one text-[5vw] text-yellow-400 md:mx-5 md:text-[4vw]"
        }
      >
        <span className={"col-span-2 md:col-span-1"}>Libérez le Guerrier</span>
        <span>qui Sommeille</span>
        <span>en Vous. ;)</span>
      </h1>
      <ImageTransition />
    </section>
  );
}

export default Banner;
