import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";

export const metadata: Metadata = {
  title: routePaths.products.title,
  description: "",
};

export default function ProductsPage() {
  return <section>Products Page</section>;
}
