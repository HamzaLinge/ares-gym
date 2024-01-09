"use client";

import React from "react";
import { signOut } from "@/app/(main)/util/action";

export default function TopBar() {
  return (
    <nav
      className={
        "sticky left-0 top-0 grid w-full grid-cols-2 justify-items-center bg-bg-200 py-8"
      }
    >
      <p>Page Name</p>
      <button onClick={signOut}>Sign Out</button>
    </nav>
  );
}
