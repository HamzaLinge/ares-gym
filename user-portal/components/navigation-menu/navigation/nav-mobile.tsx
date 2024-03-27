"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { TLinkNavigation } from "@/types/ui";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbNavigationSearch } from "react-icons/tb";

const LinkMobileComponent = (
  props: TLinkNavigation & {
    closeCallback: () => void;
  },
) => {
  const pathname = usePathname();
  const isActive = pathname === props.path;

  return (
    <div
      className={cn(
        "hover:bg-foreground/15 hover:text-primary border-b first:border-t hover:cursor-pointer",
        isActive && "bg-foreground/10",
      )}
      onClick={() => props.closeCallback()}
    >
      <Link href={props.path}>
        <div className="space-x-2">
          {/* <props.Icon className="h-6 w-6" /> */}
          <p className=" w-full py-4 pl-4 capitalize">{props.label}</p>
        </div>
      </Link>
    </div>
  );

  // if (!props.children) {
  //   return (
  //     <div
  //       className={cn(
  //         "hover:bg-foreground/15 hover:text-primary border-b first:border-t hover:cursor-pointer",
  //         isActive && "bg-foreground/10",
  //       )}
  //       onClick={() => props.closeCallback()}
  //     >
  //       <Link href={props.path}>
  //         <p className="w-full py-4 pl-4">{props.label.toUpperCase()}</p>
  //       </Link>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <Collapsible>
  //       <div className="flex w-full items-center border-b first:border-t">
  //         <div
  //           className="hover:bg-foreground/15 hover:text-primary grow hover:cursor-pointer"
  //           onClick={() => props.closeCallback()}
  //         >
  //           <Link href={props.path}>
  //             <p className="w-full py-4 pl-4">{props.label.toUpperCase()}</p>
  //           </Link>
  //         </div>
  //         <CollapsibleTrigger asChild>
  //           <Button variant="ghost" size="sm">
  //             <CaretSortIcon className="h-4 w-4" />
  //             <span className="sr-only">Toggle</span>
  //           </Button>
  //         </CollapsibleTrigger>
  //       </div>
  //       <CollapsibleContent>
  //         {props.children.map((childLink) => (
  //           <LinkMobileComponent
  //             key={childLink.path}
  //             {...childLink}
  //             closeCallback={props.closeCallback}
  //           />
  //         ))}
  //       </CollapsibleContent>
  //     </Collapsible>
  //   );
  // }
};

export default function NavMobile({ links }: { links: TLinkNavigation[] }) {
  const side = "left";

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant="ghost"
          className="justify-self-start lg:hidden"
        >
          <HamburgerMenuIcon className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-full max-w-sm px-0">
        <SheetHeader className="p-4 pt-0">
          <SheetTitle asChild>
            <div className="flex items-center gap-x-2">
              <TbNavigationSearch className="h-6 w-6" />
              <span>Navigation</span>
            </div>
          </SheetTitle>
          <SheetDescription asChild>
            <p className="flex w-full">Go to shop to find what you need</p>
          </SheetDescription>
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
