import React from "react";
import { cn } from "@/lib/utils";

export default function Aside({ isOpen, setIsOpen }) {
  return (
    <aside
      className={cn(
        "absolute left-0 top-20 flex h-[calc(100vh_-_4rem)] transition-transform md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      aria-label="Sidebar"
    >
      <nav
        className={cn(
          "absolute left-0 top-0 z-10 h-full w-64 overflow-auto border-[1px] border-b border-r border-b-bg-300 border-r-bg-300 bg-bg-200 transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        Baghdad
      </nav>
      <span
        className={cn(
          "h-full w-screen flex-1 bg-black opacity-25 transition-all md:hidden"
        )}
        onClick={() => setIsOpen(false)}
      ></span>
    </aside>
  );
}
