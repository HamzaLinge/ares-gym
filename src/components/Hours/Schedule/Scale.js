import React from "react";

function Scale() {
  return (
    <div
      className={
        "absolute bottom-0 left-0 right-0 top-0 grid grid-cols-32 text-xs"
      }
    >
      {/*  7h ------------------------------------------------------*/}
      <p
        className={
          "relative h-full w-[1px] -translate-x-1/2 justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
          }
        >
          7h
        </span>
      </p>
      {/*  14h ------------------------------------------------------*/}
      <p
        className={
          "relative col-start-15 h-full w-[1px] justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span
          className={
            "absolute bottom-0 left-0 -translate-x-full translate-y-full"
          }
        >
          14h
        </span>
      </p>
      {/*  14h 30min ------------------------------------------------------*/}
      <p
        className={
          "relative col-start-16 h-full w-[1px] justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span
          className={
            "absolute bottom-0 hidden translate-y-full flex-col md:left-1/2 md:flex md:-translate-x-1/2"
          }
        >
          <span>14h</span>
          <span>30min</span>
        </span>
      </p>
      {/*  15h ------------------------------------------------------*/}
      <p
        className={
          "relative col-start-17 h-full w-[1px] justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span className={"absolute bottom-0 left-0 translate-y-full"}>15h</span>
      </p>
      {/*  17h ------------------------------------------------------*/}
      <p
        className={
          "relative col-start-21 h-full w-[1px] justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span
          className={
            "absolute bottom-0 hidden translate-y-full sm:left-1/2 sm:inline sm:-translate-x-1/2 "
          }
        >
          17h
        </span>
      </p>
      {/*  18h ------------------------------------------------------*/}
      <p
        className={
          "relative col-start-23 h-full w-[1px] justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
          }
        >
          18h
        </span>
      </p>
      {/*  23h ------------------------------------------------------*/}
      <p
        className={
          "relative col-start-33 h-full w-[1px] translate-x-1/2 justify-items-start rounded-full bg-zinc-400"
        }
      >
        <span
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
          }
        >
          23h
        </span>
      </p>
    </div>
  );
}

export default Scale;
