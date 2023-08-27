import React from "react";
import Presentation from "@/components/Insight/Presentation";
import Attributes from "@/components/Insight/Attributes";

export default function Insight() {
  return (
    <section
      id={"insight"}
      className={"flex w-full flex-col items-center bg-yellow-500 px-5 py-10"}
    >
      <h2
        className={
          "mb-10 text-2xl font-bold text-blue-900 sm:text-3xl md:text-4xl"
        }
      >
        Bienvenue à Ares Gym
      </h2>
      <Presentation />
      <Attributes />
    </section>
  );
}
