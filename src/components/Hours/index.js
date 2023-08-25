import React from "react";
import LineHours from "@/components/Hours/LineHours";
import Day from "@/components/Hours/Day";
import Scale from "@/components/Hours/Scale";

function Hours() {
  return (
    <section className={"p min-h-screen w-full bg-zinc-100 px-4 py-10"}>
      <h2 className={"mb-10 uppercase"}>Heures d'Entrainement</h2>
      <div className={"flex w-full gap-x-2"}>
        <div className={"grid-rows-7 grid text-xs"}>
          <Day day={"dimanche"} />
          <Day day={"lundi"} />
          <Day day={"mardi"} />
          <Day day={"mercredi"} />
          <Day day={"jeudi"} />
          <Day day={"vendredi"} />
          <Day day={"samedi"} />
        </div>
        <div className={"grid-rows-7 relative grid grow"}>
          {/* Sunday */}
          <LineHours />
          {/* Monday */}
          <LineHours />
          {/* Tuesday */}
          <LineHours nbrExclusiveWomenHours={4} />
          {/* Wednesday */}
          <LineHours />
          {/* Thursday */}
          <LineHours nbrExclusiveWomenHours={4} />
          {/* Friday */}
          <LineHours noMixte={true} nbrExclusiveWomenHours={4} />
          {/* Saturday */}
          <LineHours nbrExclusiveWomenHours={4} />

          <Scale />
        </div>
      </div>
    </section>
  );
}

export default Hours;
