import React from "react";
import { MdAllInclusive, MdEventAvailable } from "react-icons/md";
import { ImPower } from "react-icons/im";
import CardAttribute from "@/components/Insight/Attributes/CardAttribute";

function Attributes() {
  return (
    <div className={"flex w-full items-center justify-between md:max-w-4xl"}>
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
          "Chacun pourra s'entriner dans les conditions qui lui seront favorables."
        }
        Icon={MdAllInclusive}
      />

      <CardAttribute
        title={"Compléments Alimentaires"}
        description={
          "Votre apport en protéine et en enèrgie toujours disponible."
        }
        Icon={ImPower}
      />
    </div>
  );
}

export default Attributes;
