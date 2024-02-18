import HeaderPage from "@/components/custom/HeaderPage";
import { routePaths } from "@/utils/route-paths";

export default function HeaderSupplements() {
  return (
    <HeaderPage
      addBtnLink={{
        path: routePaths.supplements.children.create.path,
        label: "New Supplement!",
      }}
      listTitle={"Supplements"}
    >
      Supplements Statistics
    </HeaderPage>
  );
}
