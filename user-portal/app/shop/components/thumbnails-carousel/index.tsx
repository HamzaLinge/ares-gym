"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import "@/app/shop/components/thumbnails-carousel/carousel.css";
import Image from "next/image";

export default function ThumbnailsCarousel({
  thumbnails,
}: {
  thumbnails?: string[];
}) {
  if (!thumbnails || thumbnails.length === 0) return null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({});
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {thumbnails.map((thumbnailId, index) => (
            <div className="embla__slide" key={index}>
              <div className={"relative aspect-square w-full overflow-hidden"}>
                <Image
                  // src={getFileUrl(thumbnailId)}
                  src={`http://localhost:3001/file/${thumbnailId}`}
                  alt={thumbnailId}
                  fill={true}
                  style={{ objectFit: "cover" }}
                  sizes={"(max-width: 640px) 100vw, (max-width: 1024px) 50vw"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {thumbnails.map((thumbnailId, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                thumbnailId={thumbnailId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type ThumbType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  thumbnailId: string;
};

export const Thumb: React.FC<ThumbType> = (props) => {
  const { selected, index, onClick, thumbnailId } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : "",
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <div className={"relative aspect-square w-full overflow-hidden"}>
          <Image
            // src={getFileUrl(thumbnailId)}
            src={`http://localhost:3001/file/${thumbnailId}`}
            alt={thumbnailId}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={"(max-width: 640px) 100vw, (max-width: 1024px) 50vw"}
          />
        </div>
      </button>
    </div>
  );
};
