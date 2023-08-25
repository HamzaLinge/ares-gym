import React from "react";

function LineHours({ nbrExclusiveWomenHours, noMixte }) {
  return (
    <div
      className={
        "relative flex grid h-10 grow grid-cols-16 content-center items-center"
      }
    >
      <span
        className={"absolute -left-[6px] -right-[6px] h-[1px] bg-zinc-400"}
      ></span>
      <span
        className={`z-10 col-span-7 h-2 rounded-full ${
          noMixte ? "bg-transparent" : "bg-black"
        }`}
      ></span>
      {nbrExclusiveWomenHours ? (
        <>
          <span
            className={`col-span-${nbrExclusiveWomenHours} z-10 h-2 rounded-full bg-pink-900`}
          ></span>
          <span
            className={`col-span-${
              16 - 7 - nbrExclusiveWomenHours
            } z-10 h-2 rounded-full bg-blue-900`}
          ></span>
        </>
      ) : (
        <span className={"z-10 col-span-9 h-2 rounded-full bg-blue-900"}></span>
      )}
    </div>
  );
}

export default LineHours;
