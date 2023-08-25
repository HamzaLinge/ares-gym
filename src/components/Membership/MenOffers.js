import React from "react";
import { GiSpartanHelmet, GiSwordman, GiZeusSword } from "react-icons/gi";

import CardMembership from "@/components/Membership/CardMembership";

export default function MenOffers() {
  return (
    <section
      className={
        "flex min-h-screen w-full flex-col bg-blue-900 px-4 py-10 md:px-10"
      }
    >
      <h2 className={"mb-10 text-xl uppercase md:text-2xl"}>
        Offres pour Hommes
      </h2>
      <div className={"relative grid w-full grow grid-rows-2 gap-y-4"}>
        <div className={"flex w-full flex-col content-center"}>
          <p className={"text-sm md:text-base"}>
            Parcourez votre propre épopée physique avec nos programmes
            exclusifs, spécialement conçus pour les hommes désireux de se forger
            un corps digne des légendes.
          </p>
          <GiSwordman
            className={"-rotate-30 w-auto grow text-white opacity-50"}
          />
        </div>
        <div
          className={
            "flex w-full items-center justify-center gap-x-2 sm:gap-x-10"
          }
        >
          <CardMembership
            title={"Spartiate"}
            price={3000}
            session={3}
            Icon={GiSpartanHelmet}
            color={"blue"}
          />
          <CardMembership
            title={"Zeus"}
            price={4300}
            session={null}
            Icon={GiZeusSword}
            color={"blue"}
          />
        </div>
      </div>
    </section>
  );
}
