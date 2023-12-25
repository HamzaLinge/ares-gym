import React from "react";

import { cn } from "../../../../../utils";

function LineColor({ color, lineHeight, title }) {
  return (
    <div className={"flex items-center gap-x-4 text-xs md:text-sm"}>
      <span
        style={{ height: lineHeight }}
        className={cn("w-4 rounded-full", color)}
      ></span>
      <p>{title}</p>
    </div>
  );
}

export default LineColor;
