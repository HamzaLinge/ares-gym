import React from "react";
import MixMenOffers from "@/components/Offers/MixMenOffers";
import WomenOffers from "@/components/Offers/WomenOffers";

export default function Offers() {
  return (
    <section id={"offers"} className={"flex w-full flex-col text-white"}>
      <MixMenOffers />
      <WomenOffers />
    </section>
  );
}

//lg:grid lg:grid-cols-2
