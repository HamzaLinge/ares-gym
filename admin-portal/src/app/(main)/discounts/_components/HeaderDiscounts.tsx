import React from "react";
import { routePaths } from "@/utils/route-paths";
import HeaderPage from "@/components/custom/HeaderPage";

export default function HeaderDiscounts() {
  return (
    <HeaderPage
      addBtnLink={{
        path: routePaths.discounts.children.create.path,
        label: "New Discount!",
      }}
      listTitle={"Discounts"}
    >
      Supplements Dashboard
    </HeaderPage>
  );
}
