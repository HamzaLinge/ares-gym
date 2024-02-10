import Image from "next/image";

import { Carousel, CarouselItem } from "@/components/custom/Carousel";
import { getFileUrl } from "@/utils/helpers";

export default function CarouselThumbnailsSupplement({
  thumbnails,
}: {
  thumbnails: string[] | undefined;
}) {
  if (!thumbnails) {
    return null;
  }

  return (
    <Carousel>
      {thumbnails.map((thumbnail) => (
        <CarouselItem key={thumbnail}>
          <Image
            src={getFileUrl(thumbnail)}
            alt={""}
            width={600}
            height={600}
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
}
