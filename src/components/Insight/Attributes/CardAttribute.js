import React from "react";

function CardAttribute({ title, description, Icon }) {
  return (
    <div
      className={
        "flex h-52 w-56 flex-col items-center justify-between rounded-lg bg-zinc-200 p-4 shadow-lg shadow-gray-600"
      }
    >
      <h3 className={"text-center text-xl font-semibold"}>{title}</h3>
      <p className={"text-center"}>{description}</p>
      <Icon className={"h-7 w-7 text-black"} />
    </div>
  );
}

export default CardAttribute;
