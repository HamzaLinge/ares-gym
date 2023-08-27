import React from "react";
import { cn } from "../../../utils";

function About() {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-8 p-10 text-zinc-50 lg:flex-row lg:px-20"
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
          "text-center text-sm font-light lg:grow lg:text-start lg:text-base"
        }
      >
        Salut à tous, <br />
        <br />
        C'est Hamza, le créateur d'Ares Gym. Ma passion pour la musculation m'a
        poussé à créer cet espace où chacun peut devenir une légende. Né le 27
        mai 2000, l'ouverture d'Ares Gym était bien plus qu'une entreprise –
        c'était une aventure pour réaliser un rêve profondément ancré.
        <br />
        <br />
        Chaque haltère soulevé, chaque goutte de sueur versée, porte l'énergie
        des héros anciens. Rejoignez cette histoire, sculptez votre propre
        légende physique et plongez dans l'esprit mythique d'Ares Gym.
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
