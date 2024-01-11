"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Drawer({ children, isOpen, setIsOpen }: DrawerProps) {
  return (
    <main
      className={cn(
        "fixed inset-0 z-10 transform overflow-hidden bg-black bg-opacity-25 ease-in-out",
        isOpen
          ? "translate-x-0 opacity-100 transition-opacity duration-500"
          : "-translate-x-full opacity-0 transition-all delay-500"
      )}
    >
      <section
        className={cn(
          "delay-400 absolute left-0 h-screen w-[calc(100vw_-_30px)] transform transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-0 " : "-translate-x-full "
        )}
      >
        {children}
      </section>
      <section
        className={"h-full w-screen cursor-pointer"}
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
