import React from "react";
import MenOffers from "@/components/Membership/MenOffers";
import WomenOffers from "@/components/Membership/WomenOffers";

export default function Membership() {
  return (
    <section
      className={"flex w-full flex-col text-white lg:grid lg:grid-cols-2"}
    >
      <MenOffers />
      <WomenOffers />
    </section>
  );
}
