import React from "react";

function CardMembership({ title, price, attributes, session, Icon }) {
  return (
    <div
      className={
        "relative flex h-64 w-60 flex-col items-center justify-between rounded-lg bg-blue-400 p-4 text-black shadow-lg shadow-gray-800"
      }
    >
      <Icon className={"absolute left-0 top-0 h-7 w-7 text-blue-900"} />
      <div className={"flex flex-col items-center gap-y-2"}>
        <p className={"font-semibold text-blue-900"}>{title}</p>
        <p className={"text-xl font-bold"}>{price} DA/Mois</p>
      </div>
      <div>
        {attributes.map((attr) => (
          <p key={`${title}-${attr}`}>- {attr}</p>
        ))}
      </div>
      <p className={"text-lg font-semibold"}>
        {session ? `${session} Sessions/Semaine` : "Sessions Illimitées"}
      </p>
    </div>
  );
}

export default CardMembership;
