import { getSupplementById } from "@/actions/supplement";

export default async function SupplementPage({
  params: { supplementId },
}: {
  params: { supplementId: string };
}) {
  const supplement = await getSupplementById(supplementId);

  return (
    <section>
      <p>Product Page: {supplement.name}</p>
    </section>
  );
}
