"use client";

import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { signOut } from "@/app/(main)/actions";

export default function Header({ setIsOpen }) {
  return (
    <header
      className={
        "z-10 grid h-20 w-full grid-cols-3 justify-items-center border-[1px] border-b-bg-300 bg-bg-200 py-6 md:grid-cols-2"
      }
    >
      <HamburgerMenuIcon
        className={
          "m-2 h-10 w-10 cursor-pointer self-start rounded bg-primary-100 p-1 text-bg-200 hover:bg-primary-200 hover:text-bg-100 md:hidden"
        }
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <p>Logo</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </header>
  );
}
