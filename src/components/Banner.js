import React from "react";

function Banner() {
  return (
    <div
      className={
        "flex w-full flex-col items-center bg-slate-800 text-yellow-400"
      }
    >
      <h1 className={"mt-24 flex w-full items-center justify-evenly"}>
        <span>A</span>
        <span>R</span>
        <span>E</span>
        <span>S</span>
      </h1>

      <h2 className={"flex w-full items-center justify-evenly"}>
        <span>G</span>
        <span>Y</span>
        <span>M</span>
      </h2>
    </div>
  );
}

export default Banner;
