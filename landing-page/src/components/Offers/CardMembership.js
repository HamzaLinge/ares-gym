import React from "react";
import {
  GiWeightLiftingUp,
  GiRunningNinja,
  GiShower,
  GiInfinity,
} from "react-icons/gi";
import { cn } from "../../../utils";

function CardMembership({ title, price, session, Icon, color, className }) {
  return (
    <div
      className={cn(
        "relative grid w-full max-w-[200px] grid-rows-3 justify-items-center rounded-lg p-1 text-black shadow-lg shadow-current",
        className,
        color === "blue" ? "bg-blue-300" : "bg-pink-300"
      )}
    >
      <Icon
        className={`absolute left-0 top-0 h-7 w-7 ${
          color === "blue" ? "text-blue-900" : "text-pink-900"
        }`}
      />
      <div className={"mb-0 flex flex-col items-center justify-evenly"}>
        <p
          className={`font-inter-semibold ${
            color === "blue" ? "text-blue-900" : "text-pink-900"
          }`}
        >
          {title}
        </p>
        <p
          className={`rounded-full font-inter ${
            color === "blue" ? "bg-blue-900" : "bg-pink-900"
          }  p-2 text-white`}
        >
          {price} DA/Mois
        </p>
      </div>
      <div
        className={"my-4 flex flex-col justify-evenly font-inter-light text-sm"}
      >
        <p className={"flex items-center gap-x-2"}>
          <GiWeightLiftingUp className={"h-4 w-4 text-black"} />
          <span>Musculation</span>
        </p>
        <p className={"flex items-center gap-x-2"}>
          <GiRunningNinja className={"h-4 w-4 text-black"} />
          <span>Cardio</span>
        </p>
        <p className={"flex items-center gap-x-2"}>
          <GiShower className={"h-4 w-4 text-black"} />
          <span>Douche</span>
        </p>
      </div>
      <p
        className={
          "flex flex-col items-center justify-center font-inter font-semibold"
        }
      >
        <span className={"flex flex-col items-center justify-center"}>
          {session ? session : <GiInfinity className={"h-4 w-4 text-black"} />}
        </span>
        <span className={"flex flex-col items-center justify-center text-sm"}>
          Sessions/Semaine
        </span>
      </p>
    </div>
  );
}

export default CardMembership;
