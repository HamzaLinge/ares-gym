import React from "react";
import { cn } from "../../../../utils";

function LineHours({
  unitContainerHeight,
  lineHeight,
  class_nbrExclusiveWomenHours,
  boolMix,
}) {
  return (
    <div
      className={cn(
        `relative flex grid grow grid-cols-16 content-center items-center`,
        unitContainerHeight
      )}
    >
      <span
        className={"absolute -left-[6px] -right-[6px] h-[1px] bg-zinc-400"}
      ></span>
      <span
        className={cn("z-10 col-span-7 rounded-full bg-black", lineHeight, {
          "bg-transparent": boolMix,
        })}
      ></span>
      {class_nbrExclusiveWomenHours ? (
        <>
          <span
            className={cn(
              `z-10 rounded-full bg-pink-900`,
              lineHeight,
              class_nbrExclusiveWomenHours
            )}
          ></span>
          <span
            className={cn(
              `z-10 col-span-5 rounded-full bg-blue-900`,
              lineHeight
            )}
          ></span>
        </>
      ) : (
        <span
          className={cn("z-10 col-span-9 rounded-full bg-blue-900", lineHeight)}
        ></span>
      )}
    </div>
  );
}

export default LineHours;
