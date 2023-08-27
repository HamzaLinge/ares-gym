import React from "react";

import { getGridColumnValue } from "../../../../utils";

function LineHours({ containerHeight, lineHeight, schedule }) {
  const styleContainer = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(32, minmax(0, 1fr))",
    alignItems: "center",
    height: containerHeight,
  };

  return (
    <div style={styleContainer}>
      {/*  Background Line -------------------------------- */}
      <span
        className={"absolute -left-[6px] -right-[6px] h-[1px] bg-zinc-400"}
      ></span>
      {/*  Mix Line ------------------------------------------*/}
      {schedule.mix ? (
        <span
          style={{
            height: lineHeight,
            gridColumnStart: getGridColumnValue(schedule.mix.start),
            gridColumnEnd: getGridColumnValue(schedule.mix.end),
          }}
          className={"z-10 rounded-full bg-black"}
        ></span>
      ) : undefined}

      {/*  Women Line ------------------------------------------*/}
      {schedule.women ? (
        <span
          style={{
            height: lineHeight,
            gridColumnStart: getGridColumnValue(schedule.women.start),
            gridColumnEnd: getGridColumnValue(schedule.women.end),
          }}
          className={"z-10 rounded-full bg-pink-900"}
        ></span>
      ) : undefined}

      {/*  Men Line ------------------------------------------*/}
      {schedule.men ? (
        <span
          style={{
            height: lineHeight,
            gridColumnStart: getGridColumnValue(schedule.men.start),
            gridColumnEnd: getGridColumnValue(schedule.men.end),
          }}
          className={"z-10 rounded-full bg-blue-900"}
        ></span>
      ) : undefined}
    </div>
  );
}

export default LineHours;
