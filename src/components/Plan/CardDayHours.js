import React from "react";

export default function CardDayHours({ day, hoursIntervals }) {
  return (
    <div className={"flex w-full items-center justify-between"}>
      <p>{day}</p>
      <span
        className={"mx-4 h-[1px] grow rounded-full bg-white opacity-50"}
      ></span>
      <p className={"flex items-center divide-x"}>
        {hoursIntervals.map(({ start, end }, index) => (
          <span
            key={`${day}-${index}`}
            className={`${
              index === hoursIntervals.length - 1 ? "pl-2" : "pr-2"
            }`}
          >
            {start}h - {end}h
          </span>
        ))}
      </p>
    </div>
  );
}
