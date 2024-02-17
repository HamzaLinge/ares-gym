"use client";

import React, { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface Link {
  title: string;
  path: string;
}

interface AsideProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  links: Link[];
}

export default function Aside({ isOpen, setIsOpen, links }: AsideProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "absolute left-0 top-0 flex h-screen -translate-x-full transition-transform lg:top-20 lg:h-[calc(100vh_-_4rem)] lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label="Sidebar"
    >
      <nav
        className={cn(
          "border-r-border bg-muted absolute left-0 top-0 z-20 flex h-full w-2/3 flex-col justify-between overflow-auto border-r transition-transform lg:w-64 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div>
          <h2
            className={
              "border-b-border text-foreground w-full border-b p-8 text-center text-2xl font-semibold lg:hidden"
            }
          >
            Navigation
          </h2>
          <ul>
            {links.map(({ title, path }) => (
              <Link
                key={path}
                href={path}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <li
                  className={cn(
                    "border-b-border w-full border-b p-4 text-center hover:cursor-pointer",
                    pathname.startsWith(path) &&
                      "bg-muted-foreground text-muted pointer-events-none",
                  )}
                >
                  {title}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <footer className={"w-full p-4 text-center text-sm"}>
          Some footer information
        </footer>
      </nav>
      <span
        className={cn(
          "h-full w-screen flex-1 bg-black opacity-25 transition-all lg:hidden",
          isOpen ? "flex" : "hidden",
        )}
        onClick={() => setIsOpen(false)}
      ></span>
    </aside>
  );
}
