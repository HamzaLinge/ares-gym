import React from "react";
import Schedule from "@/components/Hours/Schedule";

function Hours() {
  return (
    <section
      className={
        "flex min-h-screen w-full flex-col items-center bg-zinc-100 px-4 py-10"
      }
    >
      <h2 className={"mb-10 self-start uppercase"}>Heures d'Entrainement</h2>
      <Schedule />
    </section>
  );
}

export default Hours;
