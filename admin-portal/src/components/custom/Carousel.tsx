"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

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
    <div ref={emblaRef} className={"overflow-hidden relative w-full max-w-lg"}>
      {/* Container */}
      <div className={"flex items-center gap-x-2"}>
        {/* Slides */}
        {children}
      </div>
      <ChevronLeftIcon
        onClick={scrollPrev}
        className={
          "w-12 h-12 text-bg-100 absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 bg-slate-100 bg-opacity-25 rounded-full hover:cursor-pointer hover:text-black hover:bg-opacity-75"
        }
      />
      <ChevronRightIcon
        onClick={scrollNext}
        className={
          "w-12 h-12 text-bg-100 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-slate-100 bg-opacity-25 rounded-full hover:cursor-pointer hover:text-black hover:bg-opacity-75"
        }
      />
    </div>
  );
}
