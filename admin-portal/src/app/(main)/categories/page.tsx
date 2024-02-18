import Categories from "@/app/(main)/categories/_components/Categories";
import HeaderCategories from "@/app/(main)/categories/_components/HeaderCategories";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default async function CategoriesPage() {
  return (
    <section>
      <HeaderCategories />
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>
    </section>
  );
}
