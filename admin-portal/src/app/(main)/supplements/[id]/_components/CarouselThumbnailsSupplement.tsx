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
            width={1280}
            height={1080}
            sizes={
              "(max-width: 640px) 100vw, (max-width: 1080px) 66.66vw, 50vw"
            }
            className={"border-[4px] border-white rounded"}
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
}
