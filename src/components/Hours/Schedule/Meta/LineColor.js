import React from "react";

import { cn } from "../../../../../utils";

function LineColor({ color, lineHeight, title }) {
  return (
    <div className={"flex items-center gap-x-4 text-xs md:text-sm"}>
      <span className={cn("w-4 rounded-full", color, lineHeight)}></span>
      <p>{title}</p>
    </div>
  );
}

export default LineColor;
