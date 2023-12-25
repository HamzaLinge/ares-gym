import React from "react";

function Part({ title, content }) {
  return (
    <div className={"flex flex-col items-center text-xs font-light"}>
      <h3 className={"font-normal"}>{title} :</h3>
      <p className={"w-full text-center"}>{content}</p>
    </div>
  );
}

export default Part;
