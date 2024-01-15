"use client";

import React, { Ref, useCallback, useState } from "react";
import colors from "@/styles/colors";

interface Translate {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

export const useCenteredTree = (
  defaultTranslate: Translate = { x: 0, y: 0 }
) => {
  const [translate, setTranslate] = useState<Translate>(defaultTranslate);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const containerRef: Ref<HTMLDivElement> = useCallback(
    (containerElem: HTMLDivElement | null) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 2 });
      }
    },
    []
  );
  return [dimensions, translate, containerRef];
};

export const customSVGNode = ({ nodeDatum, toggleNode }) => {
  let bgColor: string;
  let textColor = colors.text["200"];
  let strokeColor = "#000";

  if (nodeDatum.children) {
    if (nodeDatum.name === "Categories") {
      bgColor = colors.accent["100"];
    } else {
      bgColor = colors.accent["200"];
    }
  } else {
    bgColor = colors.primary["100"];
  }

  return (
    <g className={"node"}>
      <circle
        r={10}
        onClick={toggleNode}
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth={0.5}
      />
      <text fontSize={15} fill={textColor} strokeWidth={"0.25"} x={"20"}>
        {nodeDatum.name}
      </text>
      {nodeDatum.description && (
        <text
          fill={textColor}
          x={"20"}
          dy={"20"}
          strokeWidth={"0.25"}
          fontSize={10}
        >
          {nodeDatum.description}
        </text>
      )}
      <g className={"node-icons"} style={{ display: "block" }}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          x={"10"}
          y={"-20"}
        >
          <path
            d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </g>
    </g>
  );
};
