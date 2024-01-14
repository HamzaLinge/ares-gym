import React from "react";
import "react-complex-tree/lib/style-modern.css";

import categories from "@/app/(main)/categories/utils/fake-categories";
import ClientWrapper from "@/app/(main)/categories/utils/ClientWrapper";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";

export default function CategoriesPage() {
  // const Tree = dynamic(() => import("react-d3-tree"), { ssr: false });

  const data = [
    { id: "1", name: "Unread" },
    { id: "2", name: "Threads" },
    {
      id: "3",
      name: "Chat Rooms",
      children: [
        { id: "c1", name: "General" },
        { id: "c2", name: "Random" },
        { id: "c3", name: "Open Source Projects" },
      ],
    },
    {
      id: "4",
      name: "Direct Messages",
      children: [
        { id: "d1", name: "Alice" },
        { id: "d2", name: "Bob" },
        { id: "d3", name: "Charlie" },
      ],
    },
  ];
  return (
    <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
      <UncontrolledTreeEnvironment
        dataProvider={
          new StaticTreeDataProvider(data, (item, name) => ({
            ...item,
            data,
          }))
        }
        getItemTitle={(item) => item.data}
        viewState={{}}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
}
