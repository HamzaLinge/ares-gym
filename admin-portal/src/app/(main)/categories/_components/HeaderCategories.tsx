import React from "react";

import { routePaths } from "@/utils/route-paths";
import HeaderPage from "@/components/custom/HeaderPage";

export default async function HeaderCategories() {
  return (
    <HeaderPage
      title={"categories"}
      pathAddBtnLink={routePaths.categories.children.create.path()}
    >
      Dashboard Categories
    </HeaderPage>
  );
}
