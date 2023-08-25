import React from "react";

function CardAttribute({ title, description, Icon }) {
  return (
    <div
      className={
        "relative flex h-40 w-40 flex-col items-center justify-evenly overflow-hidden rounded-md bg-yellow-100 p-4 shadow-md shadow-gray-600 sm:rounded-full md:h-52 md:w-52"
      }
    >
      <h3 className={"text-center text-sm font-bold md:text-lg"}>{title}</h3>
      <p className={"text-center text-xs md:text-sm"}>{description}</p>
      <Icon
        className={
          "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 text-black opacity-10"
        }
      />
    </div>
  );
}

export default CardAttribute;
