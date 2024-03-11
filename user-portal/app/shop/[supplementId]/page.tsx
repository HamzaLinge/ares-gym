import { getSupplementById } from "@/actions/supplement";
import ThumbnailsCarousel from "@/app/shop/components/thumbnails-carousel";

export default async function SupplementPage({
  params: { supplementId },
}: {
  params: { supplementId: string };
}) {
  const supplement = await getSupplementById(supplementId);

  return (
    <section>
      <div className="w-full">
        <ThumbnailsCarousel />
      </div>
      <p>Supplement Page: {supplement.name}</p>
    </section>
  );
}
