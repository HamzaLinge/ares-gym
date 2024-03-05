"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TLinkNavigation } from "@/types/ui";
import { CaretSortIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { forwardRef, useState } from "react";

const LinkMobileComponent = (
  props: TLinkNavigation & {
    closeCallback: () => void;
  },
) => {
  if (!props.children) {
    return (
      <div
        className="hover:bg-foreground/25 hover:text-primary border-b first:border-t hover:cursor-pointer"
        onClick={() => props.closeCallback()}
      >
        <Link href={props.path}>
          <p className="w-full py-4 pl-4">{props.label.toUpperCase()}</p>
        </Link>
      </div>
    );
  } else {
    return (
      <Collapsible>
        <div className="flex w-full items-center border-b first:border-t">
          <div
            className="hover:bg-foreground/25 hover:text-primary grow hover:cursor-pointer"
            onClick={() => props.closeCallback()}
          >
            <Link href={props.path}>
              <p className="w-full py-4 pl-4">{props.label.toUpperCase()}</p>
            </Link>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {props.children.map((childLink) => (
            <LinkMobileComponent
              key={childLink.path}
              {...childLink}
              closeCallback={props.closeCallback}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export default function MenuMobile({ links }: { links: TLinkNavigation[] }) {
  const side = "left";

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet key={side} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant="outline" className="md:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-full max-w-sm px-0">
        <SheetHeader className="p-4 pt-0">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Go to shop to find what you need</SheetDescription>
        </SheetHeader>
        <nav>
          {links.map((link) => (
            <LinkMobileComponent
              key={link.path}
              {...link}
              closeCallback={close}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
