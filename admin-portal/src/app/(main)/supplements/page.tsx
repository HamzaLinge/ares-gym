import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";
import HeaderSupplements from "@/app/(main)/supplements/_components/HeaderSupplements";
import { getSupplements } from "@/app/(main)/supplements/_utils/actions";
import Supplements from "@/app/(main)/supplements/_components/Supplements";

export const metadata: Metadata = {
  title: routePaths.supplements.title,
  description: "",
};

export default async function SupplementsPage() {
  const supplements = await getSupplements();

  return (
    <section>
      <HeaderSupplements />
      {!supplements.success ? (
        <p>{supplements.error.message}</p>
      ) : (
        <Supplements supplements={supplements.data.supplements} />
      )}
    </section>
  );
}
