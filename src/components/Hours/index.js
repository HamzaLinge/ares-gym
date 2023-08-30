import React from "react";
import Schedule from "@/components/Hours/Schedule";

function Hours() {
  return (
    <section
      id={"hours"}
      className={
        "flex min-h-screen w-full flex-col items-center bg-zinc-100 px-5 py-10 md:px-10"
      }
    >
      <div className={"flex w-full flex-col gap-y-4"}>
        <h2 className={"title-section"}>Heures d'Entrainement</h2>
        <p className={"text-section"}>
          Domptez le temps et forgez votre légende athlétique. Découvrez nos
          horaires d'entraînement sur mesure pour chaque catégorie – mixte,
          hommes et femmes – et tracez votre chemin vers la forme physique
          divine.
        </p>
      </div>

      <Schedule />
    </section>
  );
}

export default Hours;
