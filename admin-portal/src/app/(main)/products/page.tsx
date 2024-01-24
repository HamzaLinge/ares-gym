import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";
import HeaderProduct from "@/app/(main)/products/components/HeaderProduct";
import { getProducts } from "@/app/(main)/products/_actions";
import CardProduct from "@/app/(main)/products/components/CardProduct";

export const metadata: Metadata = {
  title: routePaths.products.title,
  description: "",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section>
      <HeaderProduct />
      {!products.success ? (
        <p>{products.error.message}</p>
      ) : (
        <div className={"flex flex-wrap"}>
          {products.data.supplements.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
