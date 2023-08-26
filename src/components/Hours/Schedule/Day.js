import React from "react";
import { cn } from "../../../../utils";

function Day({ day, unitContainerHeight }) {
  return (
    <p className={cn("flex items-center capitalize", unitContainerHeight)}>
      {day}
    </p>
  );
}

export default Day;
