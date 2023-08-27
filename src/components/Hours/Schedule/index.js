import React from "react";

import Day from "@/components/Hours/Schedule/Day";
import LineHours from "@/components/Hours/Schedule/LineHours";
import Scale from "@/components/Hours/Schedule/Scale";
import Meta from "@/components/Hours/Schedule/Meta";

function Schedule() {
  const containerHeight = `${50}px`;
  const lineHeight = `${16}px`;

  const schedules = [
    {
      day: "Dimanche",
      mix: { start: 7, end: 14.5 },
      women: undefined,
      men: { start: 14.5, end: 23 },
    },
    {
      day: "Lundi",
      mix: { start: 7, end: 14.5 },
      women: undefined,
      men: { start: 14.5, end: 23 },
    },
    {
      day: "Mardi",
      mix: { start: 7, end: 14.5 },
      women: { start: 15, end: 18 },
      men: { start: 18, end: 23 },
    },
    {
      day: "Mercredi",
      mix: { start: 7, end: 14.5 },
      women: undefined,
      men: { start: 14.5, end: 23 },
    },
    {
      day: "Jeudi",
      mix: { start: 7, end: 14.5 },
      women: { start: 15, end: 18 },
      men: { start: 18, end: 23 },
    },
    {
      day: "Vendredi",
      mix: undefined,
      women: { start: 14.5, end: 17 },
      men: { start: 17, end: 23 },
    },
    {
      day: "Samedi",
      mix: { start: 7, end: 14 },
      women: { start: 14, end: 17 },
      men: { start: 17, end: 23 },
    },
  ];

  return (
    <div
      className={"flex w-full max-w-4xl grow flex-col items-center justify-end"}
    >
      <div className={"mb-8 flex w-full gap-x-2 md:mb-14"}>
        <div className={"grid-rows-7 grid text-xs"}>
          {schedules.map(({ day }) => (
            <Day key={day} day={day} containerHeight={containerHeight} />
          ))}
        </div>
        <div className={"grid-rows-7 relative grid grow"}>
          {schedules.map((schedule) => (
            <LineHours
              key={schedule.day}
              containerHeight={containerHeight}
              lineHeight={lineHeight}
              schedule={schedule}
            />
          ))}

          <Scale />
        </div>
      </div>
      <Meta lineHeight={lineHeight} />
    </div>
  );
}

export default Schedule;
