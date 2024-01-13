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
        "absolute left-0 top-0 flex h-screen -translate-x-full transition-transform md:top-20 md:h-[calc(100vh_-_4rem)] md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      aria-label="Sidebar"
    >
      <nav
        className={cn(
          "absolute left-0 top-0 z-10 flex h-full w-2/3 flex-col justify-between overflow-auto border-[1px] border-b border-r border-b-bg-300 border-r-bg-300 bg-bg-200 transition-transform md:w-64 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          <h2
            className={
              "w-full border-b border-b-bg-300 p-8 text-center text-xl md:hidden"
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
                    "w-full cursor-pointer border-b border-b-bg-300 p-4 text-center hover:bg-primary-200 hover:text-bg-200",
                    pathname.startsWith(path) && "bg-primary-100 text-bg-200"
                  )}
                >
                  {title}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <footer className={"w-full p-4 text-center"}>
          Some footer information
        </footer>
      </nav>
      <span
        className={cn(
          "h-full w-screen flex-1 bg-black opacity-25 transition-all md:hidden",
          isOpen ? "flex" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      ></span>
    </aside>
  );
}
