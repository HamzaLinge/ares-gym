import FilterSupplements from "@/app/shop/components/filter-supplements";
import SkeletonSupplements from "@/app/shop/components/skeleton-supplements";
import Supplements from "@/app/shop/components/supplements";
import LoadingUI from "@/components/loading-ui";
import TitlePage from "@/components/title-page";
import { Suspense } from "react";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Partial<Record<string, string>>;
}) {
  return (
    <section className="flex-1 space-y-6 p-6 pt-4 md:px-12 lg:px-40">
      <TitlePage title="Shop" />
      <Suspense fallback={<LoadingUI />}>
        <FilterSupplements />
      </Suspense>
      <Suspense fallback={<SkeletonSupplements />}>
        <Supplements searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
