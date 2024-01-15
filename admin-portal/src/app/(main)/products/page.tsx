import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";
import HeaderProduct from "@/app/(main)/products/components/HeaderProduct";

export const metadata: Metadata = {
  title: routePaths.products.title,
  description: "",
};

export default function ProductsPage() {
  return (
    <section>
      <HeaderProduct />
    </section>
  );
}
