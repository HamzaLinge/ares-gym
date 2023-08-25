import React from "react";

function CardPresentation({ pathImg, text, reverse }) {
  return (
    <div
      className={`mb-10 flex w-full flex-col items-center justify-center gap-y-5 sm:gap-x-5 ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <img
        src={pathImg}
        alt={pathImg}
        className={"w-full rounded-lg shadow-lg shadow-gray-600 sm:w-1/2"}
      />
      <p className={"w-2/3 text-base sm:w-1/2 md:text-xl lg:text-2xl"}>
        {text}
      </p>
    </div>
  );
}

export default CardPresentation;
