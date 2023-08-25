import React from "react";

function Scale() {
  return (
    <div className={"absolute bottom-0 left-0 right-0 top-0 grid grid-cols-16"}>
      <div
        className={
          "relative flex h-full w-[1px] -translate-x-1/2 flex-col items-center rounded-full bg-zinc-400"
        }
      >
        <p className={"absolute bottom-0 translate-y-full text-xs"}>7h</p>
      </div>
      <div
        className={
          "relative col-span-1 col-start-7 flex h-full w-[1px] translate-x-1/2 flex-col items-center justify-self-end rounded-full bg-zinc-400"
        }
      >
        <p className={"absolute bottom-0 translate-y-full text-xs"}>14h</p>
      </div>
      <div
        className={
          "relative col-span-1 col-start-11 flex h-full w-[1px] translate-x-1/2 flex-col items-center justify-self-end rounded-full bg-zinc-400"
        }
      >
        <p className={"absolute bottom-0 translate-y-full text-xs"}>18h</p>
      </div>
      <div
        className={
          "relative col-span-1 col-start-16 flex h-full w-[1px] translate-x-1/2 flex-col items-center justify-self-end rounded-full bg-zinc-400"
        }
      >
        <p className={"absolute bottom-0 translate-y-full text-xs"}>23h</p>
      </div>
    </div>
  );
}

export default Scale;
