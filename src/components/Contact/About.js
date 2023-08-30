import React from "react";
import { cn } from "../../../utils";

function About() {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-8 text-zinc-50 lg:flex-row"
      )}
    >
      <div
        className={
          "flex aspect-square w-[150px] min-w-[150px] items-center justify-center overflow-hidden rounded-full border-2 border-zinc-200 "
        }
      >
        <img
          src={"/images/contact/hamza-profile.jpg"}
          alt={"Profile Picture"}
          className={"h-full w-full scale-150 object-contain"}
        />
      </div>

      <p
        className={
          "text-center font-inter-extralight text-sm lg:grow lg:text-start lg:text-base"
        }
      >
        Salut à tous, <br />
        <br />
        C&apos;est Hamza, le créateur d&apos;Ares Gym. Ma passion pour la
        musculation m&apos;a poussé à créer cet espace où chacun peut devenir
        une légende. Né le 27 mai 2000, l&apos;ouverture d&apos;Ares Gym était
        bien plus qu&apos;une entreprise – c&apos;était une aventure pour
        réaliser un rêve profondément ancré.
        <br />
        <br />
        Chaque haltère soulevé, chaque goutte de sueur versée, porte
        l&apos;énergie des héros anciens. Rejoignez cette histoire, sculptez
        votre propre légende physique et plongez dans l&apos;esprit mythique
        d&apos;Ares Gym.
        <br />
        <br />
        Avec détermination,
        <br />
        <br />
        Hamza
      </p>
    </div>
  );
}

export default About;
