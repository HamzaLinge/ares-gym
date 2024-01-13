"use client";

import React, { Dispatch, SetStateAction } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";

import { signOut } from "@/app/(main)/actions";

interface HeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsOpen }: HeaderProps) {
  return (
    <header
      className={
        "z-10 grid h-20 w-full grid-cols-3 place-items-center justify-items-center border-[1px] border-b-bg-300 bg-bg-200 py-6 md:grid-cols-2"
      }
    >
      <HamburgerMenuIcon
        className={
          "h-10 w-10 cursor-pointer rounded bg-transparent p-1 text-primary-300 hover:bg-primary-200 hover:text-bg-100 md:hidden"
        }
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <p className={""}>Logo</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <PersonIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"text-center"}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Lang</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
