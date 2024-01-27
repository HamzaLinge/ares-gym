import DeleteSupplement from "@/app/(main)/supplements/_components/DeleteSupplement";

import {
  getSupplementById,
  getSupplements,
} from "@/app/(main)/supplements/_actions";
import Link from "next/link";
import { routePaths } from "@/utils/route-paths";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const res = await getSupplements();

  if (res.success)
    return res.data.supplements.map((supplement) => ({
      is: supplement._id,
    }));
  else return null;
}

export default async function SupplementPage({ params }: ProductPageProps) {
  const supplement = await getSupplementById(params.id);

  return (
    <section>
      <h1>{supplement.name}</h1>
      <Link href={routePaths.supplements.children.update.path(supplement._id)}>
        <Button>Update Supplement</Button>
      </Link>
      <DeleteSupplement supplement={supplement} />
    </section>
  );
}
