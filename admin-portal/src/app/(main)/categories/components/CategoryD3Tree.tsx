"use client";
import React from "react";
import Tree from "react-d3-tree";
import {
  customSVGNode,
  useCenteredTree,
} from "@/app/(main)/categories/utils/helpers";
import categories from "@/app/(main)/categories/utils/fake-categories";
import "@/app/(main)/categories/utils/treeNodeStyle.css";

export default function CategoryD3Tree() {
  const [dimensions, translate, containerRef] = useCenteredTree();

  const orgChart = {
    name: "Categories",
    children: categories,
  };
  return (
    <div id="treeWrapper" className={"grow"} ref={containerRef}>
      <Tree
        data={orgChart}
        dimensions={dimensions}
        renderCustomNodeElement={customSVGNode}
        translate={translate}
        orientation={"vertical"}
      />
    </div>
  );
}
