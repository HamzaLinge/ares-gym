"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";

import { logout } from "@/app/auth/_utils/actions";
import { Button } from "@/components/ui/button";

interface IHeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsOpen }: IHeaderProps) {
  const handleSignOut = async () => {
    await logout();
  };
  return (
    <header
      className={
        "border-b-border bg-muted z-10 grid h-20 w-full grid-cols-3 place-items-center justify-items-center border-b py-6 lg:grid-cols-2"
      }
    >
      <Button
        size={"icon"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden"
      >
        <HamburgerMenuIcon />
      </Button>

      <p className={""}>Logo</p>
      <Button onClick={handleSignOut} size="lg" variant="secondary">
        Sign Out
      </Button>
    </header>
  );
}
