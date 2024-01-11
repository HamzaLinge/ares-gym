import React from "react";
import { cn } from "@/lib/utils";

export default function Aside({ isOpen, setIsOpen }) {
  return (
    <aside
      className={cn(
        "absolute left-0 top-20 h-full -translate-x-full",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}
      aria-label="Sidebar"
    >
      <nav
        className={cn(
          "h-full w-64 -translate-x-full overflow-auto border-[1px] border-b border-r border-b-bg-300 border-r-bg-300 bg-bg-200 transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        Baghdad
      </nav>
      <span
        className={cn(
          "absolute left-0 top-0 h-full w-screen bg-black opacity-25 md:hidden"
        )}
        onClick={() => setIsOpen(false)}
      ></span>
    </aside>
  );
}
