import React from "react";
import { MdEventAvailable } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { GiInfinity } from "react-icons/gi";

import CardAttribute from "@/components/Insight/Attributes/CardAttribute";

function Attributes() {
  return (
    <div
      className={
        "flex w-full flex-col items-center gap-y-4 sm:flex-row sm:justify-evenly md:max-w-4xl"
      }
    >
      <CardAttribute
        title={"7 Jours/Semaine"}
        description={
          "Ares Gym est ouverte tous les jours de la semaine, y compris le weekend."
        }
        Icon={MdEventAvailable}
      />

      <CardAttribute
        title={"Heures Exclusives/Inclusives"}
        description={
          "Chacun pourra s'entrainer dans les conditions qui lui seront favorables."
        }
        Icon={GiInfinity}
      />

      <CardAttribute
        title={"Compléments Alimentaires"}
        description={
          "Votre besoin en protéine et en enèrgie toujours disponible."
        }
        Icon={ImPower}
      />
    </div>
  );
}

export default Attributes;
