"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";

import { signOut } from "@/app/auth/_utils/actions";
import { Button } from "@/components/ui/button";

interface IHeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsOpen }: IHeaderProps) {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <header
      className={
        "z-10 grid h-20 w-full grid-cols-3 place-items-center justify-items-center border-[1px] border-b-bg-300 bg-bg-200 py-6 lg:grid-cols-2"
      }
    >
      <HamburgerMenuIcon
        className={
          "h-10 w-10 cursor-pointer rounded bg-transparent p-1 text-primary-300 hover:bg-primary-200 hover:text-bg-100 lg:hidden"
        }
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <p className={""}>Logo</p>
      <Button variant={"secondary"} onClick={handleSignOut}>
        Sign Out
      </Button>
    </header>
  );
}
