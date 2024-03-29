import React from "react";

import { routePaths } from "@/utils/route-paths";
import HeaderPage from "@/components/custom/HeaderPage";

export default async function HeaderCategories() {
  return (
    <HeaderPage
      listTitle={"categories"}
      addBtnLink={{
        path: routePaths.categories.children.create.path(),
        label: "New Category!",
      }}
    >
      Dashboard Categories
    </HeaderPage>
  );
}
