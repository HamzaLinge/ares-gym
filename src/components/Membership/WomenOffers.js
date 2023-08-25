import React from "react";
import { GiSpartanHelmet, GiSwordwoman, GiZeusSword } from "react-icons/gi";
import CardMembership from "@/components/Membership/CardMembership";

function WomenOffers() {
  return (
    <section
      className={
        "flex min-h-screen w-full flex-col bg-pink-900 px-4 py-10 md:px-10"
      }
    >
      <h2 className={"mb-10 text-xl uppercase md:text-2xl"}>
        Offres pour Femmes
      </h2>
      <div className={"relative grid w-full grow grid-rows-2 gap-y-4"}>
        <div className={"flex w-full flex-col content-center"}>
          <p className={"text-sm md:text-base"}>
            Sculptez votre destin physique avec nos offres de musculation
            féminines, vous invitant à relever le défi à la manière des héroïnes
            légendaires de l'Olympe.
          </p>
          <GiSwordwoman
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
            color={"pink"}
          />
          <CardMembership
            title={"Hera"}
            price={4300}
            session={null}
            Icon={GiZeusSword}
            color={"pink"}
          />
        </div>
      </div>
    </section>
  );
}

export default WomenOffers;
