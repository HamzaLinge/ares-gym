import HeaderSupplements from "@/app/(main)/supplements/_components/HeaderSupplements";
import Supplements from "@/app/(main)/supplements/_components/Supplements";
import { routePaths } from "@/utils/route-paths";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/(main)/loading";

export const metadata: Metadata = {
  title: routePaths.supplements.title,
  description: "",
};

export default async function SupplementsPage() {
  return (
    <section>
      <HeaderSupplements />
      <Suspense fallback={<Loading />}>
        <Supplements />
      </Suspense>
    </section>
  );
}
