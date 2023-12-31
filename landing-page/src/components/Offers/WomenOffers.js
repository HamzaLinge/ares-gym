import React from "react";
import {
  GiSpartanHelmet,
  GiSwordwoman,
  GiZeusSword,
  GiSpartan,
} from "react-icons/gi";
import CardMembership from "@/components/Offers/CardMembership";

function WomenOffers() {
  return (
    <section
      className={
        "flex min-h-screen w-full flex-col bg-pink-900 px-5 py-10 md:px-10"
      }
    >
      <h2 className={"title-section mb-10"}>
        Découvrez Nos Offres Féminité Légendaire
      </h2>
      <div className={"relative flex w-full grow flex-col gap-y-4"}>
        <div className={"relative mb-10 flex w-full flex-col content-center"}>
          <p className={"text-section"}>
            Sculptez votre destin physique avec nos offres de musculation
            féminines, vous invitant à relever le défi à la manière des héroïnes
            légendaires de l&apos;Olympe.
          </p>
          <GiSwordwoman
            className={
              "-rotate-30 absolute left-1/2 top-1/2 h-40 w-auto -translate-x-1/2 -translate-y-1/2 text-white opacity-25 md:translate-y-0"
            }
          />
        </div>
        <div
          className={
            "flex w-full grow flex-wrap items-center justify-center gap-5 sm:gap-10"
          }
        >
          <CardMembership
            title={"Spartiate"}
            price={3000}
            session={2}
            Icon={GiSpartanHelmet}
            color={"pink"}
          />
          <CardMembership
            title={"Athéna"}
            price={3500}
            session={3}
            Icon={GiSpartan}
            color={"pink"}
          />
          <CardMembership
            title={"Hera"}
            price={4300}
            session={4}
            Icon={GiZeusSword}
            color={"pink"}
          />
        </div>
      </div>
    </section>
  );
}

export default WomenOffers;
