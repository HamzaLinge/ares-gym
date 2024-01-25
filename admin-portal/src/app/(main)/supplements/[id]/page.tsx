import {
  getSupplementById,
  getSupplements,
} from "@/app/(main)/supplements/_actions";

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
  const fetchSupplement = await getSupplementById(params.id);
  if (!fetchSupplement.success) {
    console.error(fetchSupplement);
    throw new Error(fetchSupplement.error.message);
  }
  const supplement = fetchSupplement.data.supplement;
  return (
    <section>
      <h1>{supplement.name}</h1>
      <p></p>
    </section>
  );
}
