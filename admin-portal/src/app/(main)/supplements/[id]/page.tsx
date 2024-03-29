import {
  getSupplementById,
  getSupplements,
} from "@/app/(main)/supplements/_utils/actions";
import { Button } from "@/components/ui/button";
import { routePaths } from "@/utils/route-paths";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import CardInfoSupplement from "./_components/CardDetailSupplement";
import CarouselThumbnailsSupplement from "./_components/CarouselThumbnailsSupplement";
import DeleteSupplement from "./_components/DeleteSupplement";

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const supplements = await getSupplements();

  return supplements.map((supplement) => ({
    id: supplement._id,
  }));
}

export default async function SupplementPage({ params }: ProductPageProps) {
  const supplement = await getSupplementById(params.id);

  return (
    <section className={"flex flex-1 flex-col items-center gap-y-4"}>
      <div>Supplement Statistics</div>

      <CardInfoSupplement {...supplement} />

      <div className={"flex w-full items-center justify-center gap-x-2"}>
        <Link
          href={{
            pathname: routePaths.supplements.children.update.path(
              supplement._id,
            ),
          }}
        >
          <Button>
            <Pencil1Icon className="mr-2 h-4 w-4" /> Update
          </Button>
        </Link>
        <DeleteSupplement supplement={supplement} />
      </div>

      <CarouselThumbnailsSupplement supplement={supplement} />
    </section>
  );
}
