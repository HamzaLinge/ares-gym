import React from "react";

import LineColor from "@/components/Hours/Schedule/Meta/LineColor";

import { cn } from "../../../../../utils";

function Meta({ lineHeight, className }) {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <LineColor
        lineHeight={lineHeight}
        color={"bg-black"}
        title={"Mixte (Hommes et Femmes)"}
      />
      <LineColor
        lineHeight={lineHeight}
        color={"bg-pink-900"}
        title={"Femmes Seulement"}
      />
      <LineColor
        lineHeight={lineHeight}
        color={"bg-blue-900"}
        title={"Hommes Seulement"}
      />
    </div>
  );
}

export default Meta;
