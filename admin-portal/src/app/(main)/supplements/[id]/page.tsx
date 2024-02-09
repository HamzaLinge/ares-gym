import DeleteSupplement from "@/app/(main)/supplements/_components/DeleteSupplement";

import {
  getSupplementById,
  getSupplements,
} from "@/app/(main)/supplements/_utils/actions";
import Link from "next/link";
import { routePaths } from "@/utils/route-paths";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getFileUrl } from "@/utils/helpers";
import Image from "next/image";

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const res = await getSupplements();

  if (res.success)
    return res.data.supplements.map((supplement) => ({
      id: supplement._id,
    }));
  else return null;
}

export default async function SupplementPage({ params }: ProductPageProps) {
  const supplement = await getSupplementById(params.id);

  return (
    <section className={"w-full flex flex-col items-center"}>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {supplement.thumbnails &&
            supplement.thumbnails.map((thumbnail, index) => (
              <CarouselItem key={index}>
                <Image
                  src={getFileUrl(thumbnail)}
                  alt={`${supplement.name}-thumbnail-${index}`}
                  width={600}
                  height={600}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <h1>{supplement.name}</h1>
      <Link href={routePaths.supplements.children.update.path(supplement._id)}>
        <Button>Update Supplement</Button>
      </Link>
      <DeleteSupplement supplement={supplement} />
    </section>
  );
}
