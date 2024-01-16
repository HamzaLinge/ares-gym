"use client";
import React from "react";
import Tree, { SyntheticEventHandler } from "react-d3-tree";
import {
  customSVGNode,
  useCenteredTree,
} from "@/app/(main)/categories/utils/helpers";
import categories from "@/app/(main)/categories/utils/fake-categories";

export default function CategoryD3Tree() {
  const [dimensions, translate, containerRef] = useCenteredTree();

  const orgChart = {
    name: "CEO",
    children: categories,
  };

  const handleOnNodeClick = (e) => {
    console.log("Handle rd3 onNodeClick:");
    console.log(e);
  };
  return (
    <div id="treeWrapper" className={"grow"} ref={containerRef}>
      <Tree
        data={orgChart}
        dimensions={dimensions}
        renderCustomNodeElement={(rd3tNodeProps) =>
          customSVGNode({ ...rd3tNodeProps, handleOnNodeClick })
        }
        translate={translate}
        orientation={"vertical"}
      />
    </div>
  );
}
