import React from "react";

import Day from "@/components/Hours/Schedule/Day";
import LineHours from "@/components/Hours/Schedule/LineHours";
import Scale from "@/components/Hours/Schedule/Scale";
import Meta from "@/components/Hours/Schedule/Meta";

function Schedule() {
  const unitContainerHeight = "h-16";
  const lineHeight = "h-4";

  const schedule = [
    { day: "Dimanche", class_nbrExclusiveWomenHours: null, boolMix: false },
    { day: "Lundi", class_nbrExclusiveWomenHours: null, boolMix: false },
    {
      day: "Mardi",
      class_nbrExclusiveWomenHours: "col-span-4",
      boolMix: false,
    },
    { day: "Mercredi", class_nbrExclusiveWomenHours: null, boolMix: false },
    {
      day: "Jeudi",
      class_nbrExclusiveWomenHours: "col-span-4",
      boolMix: false,
    },
    {
      day: "Vendredi",
      class_nbrExclusiveWomenHours: "col-span-4",
      boolMix: true,
    },
    {
      day: "Samedi",
      class_nbrExclusiveWomenHours: "col-span-4",
      boolMix: false,
    },
  ];

  return (
    <div
      className={
        "flex w-full max-w-4xl grow flex-col items-center justify-between"
      }
    >
      <div className={"flex w-full gap-x-2"}>
        <div className={"grid-rows-7 grid text-xs"}>
          {schedule.map(({ day }) => (
            <Day
              key={day}
              day={day}
              unitContainerHeight={unitContainerHeight}
            />
          ))}
        </div>
        <div className={"grid-rows-7 relative grid grow"}>
          {schedule.map(({ day, class_nbrExclusiveWomenHours, boolMix }) => (
            <LineHours
              key={day}
              unitContainerHeight={unitContainerHeight}
              lineHeight={lineHeight}
              class_nbrExclusiveWomenHours={class_nbrExclusiveWomenHours}
              boolMix={boolMix}
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
