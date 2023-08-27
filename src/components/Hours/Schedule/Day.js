import React from "react";
import { cn } from "../../../../utils";

function Day({ day, containerHeight }) {
  return (
    <p
      style={{ height: containerHeight }}
      className={cn("flex items-center capitalize")}
    >
      {day}
    </p>
  );
}

export default Day;
