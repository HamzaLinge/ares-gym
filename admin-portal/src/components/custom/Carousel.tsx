"use client";

import { getFileUrl } from "@/utils/helpers";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import { Button } from "../ui/button";

type TCarousel = {
  pathImages: string[];
};

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return <div className={"min-w-0 shrink-0 grow-0 basis-full"}>{children}</div>;
}

export function Carousel({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className={"overflow-hidden relative w-full max-w-md"}>
      {/* Container */}
      <div className={"flex items-center gap-x-2"}>
        {/* Slides */}
        {children}
      </div>
      <Button
        onClick={scrollPrev}
        variant={"outline"}
        className={"absolute left-0 top-1/2 -translate-y-1/2"}
      >
        <ChevronLeftIcon className={"w-4 h-4"} />
      </Button>
      <Button
        onClick={scrollNext}
        variant={"outline"}
        className={"absolute right-0 top-1/2 -translate-y-1/2"}
      >
        <ChevronRightIcon className={"w-4 h-4"} />
      </Button>
    </div>
  );
}
