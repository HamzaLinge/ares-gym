import React from "react";
import {
  GiSpartanHelmet,
  GiSwordman,
  GiZeusSword,
  GiGreekTemple,
} from "react-icons/gi";

import CardMembership from "@/components/Offers/CardMembership";

export default function MixMenOffers() {
  return (
    <section
      className={
        "flex min-h-screen w-full flex-col bg-blue-900 px-4 py-10 md:px-10"
      }
    >
      <h2 className={"mb-10 text-xl uppercase md:text-2xl"}>
        Explorez Nos Forfaits Hommes et Mixte
      </h2>
      <div className={"relative flex w-full grow flex-col gap-y-4"}>
        <div className={"relative mb-10 flex w-full flex-col content-center"}>
          <p className={"text-sm md:text-base"}>
            Plongez dans l'univers légendaire de la remise en forme, où hommes
            et femmes se transcendent comme les dieux et déesses de la
            mythologie grecque. Notre offre Hommes et Mixtes vous attend pour
            sculpter des corps dignes de l'Olympe!
          </p>
          <GiGreekTemple
            className={
              "absolute left-1/2 top-1/2 h-40 w-auto -translate-x-1/2 -translate-y-1/2 -rotate-12 text-white opacity-25 md:translate-y-0"
            }
          />
        </div>
        <div
          className={
            "flex w-full grow flex-wrap items-center justify-center gap-x-2 gap-y-4 sm:gap-x-10"
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
