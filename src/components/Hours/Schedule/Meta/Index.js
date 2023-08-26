import React from "react";
import LineColor from "@/components/Hours/Schedule/Meta/LineColor";

function Meta({ lineHeight }) {
  return (
    <div className={"flex flex-col gap-y-2"}>
      <LineColor
        lineHeight={lineHeight}
        color={"bg-black"}
        title={"Mixte (Hommes et Femmes"}
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
