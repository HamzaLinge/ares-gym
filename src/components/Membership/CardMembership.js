import React from "react";
import { GiWeightLiftingUp, GiRunningNinja, GiShower } from "react-icons/gi";

function CardMembership({ title, price, attributes, session, Icon }) {
  return (
    <div
      className={
        "relative flex h-72 w-full flex-col items-center justify-between rounded-lg bg-blue-300 p-2 text-black shadow-lg shadow-gray-600"
      }
    >
      <Icon className={"absolute left-0 top-0 h-7 w-7 text-blue-900"} />
      <div className={"flex flex-col items-center gap-y-2"}>
        <p className={"font-semibold text-blue-900"}>{title}</p>
        <p className={"rounded-full bg-blue-900 p-2 text-white"}>
          {price} DA/Mois
        </p>
      </div>
      <div>
        <p className={"flex items-center gap-2"}>
          <GiWeightLiftingUp className={"h-4 w-4 text-black"} />
          <span>Musculation</span>
        </p>
      </div>
      <p className={"text-lg font-semibold"}>
        {session ? `${session} Sessions/Semaine` : "Sessions Illimitées"}
      </p>
    </div>
  );
}

export default CardMembership;
