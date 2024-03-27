"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { TLinkNavigation } from "@/types/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDesktop({ links }: { links: TLinkNavigation[] }) {
  const pathname = usePathname();
  return (
    <NavigationMenu className="hidden lg:inline-grid">
      <NavigationMenuList>
        {links.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link href={item.path} legacyBehavior passHref>
              <NavigationMenuLink
                active={pathname === item.path}
                className={navigationMenuTriggerStyle()}
              >
                <span className="font-semibold capitalize">{item.label}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// type TItemLinkProps = {
//   href: string;
// } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// const ItemLink = ({ href, ...props }: TItemLinkProps) => {
//   const pathname = usePathname();
//   const isActive = href === pathname;

//   return (
//     <NavigationMenu.Link asChild active={isActive}>
//       <Link href={href} {...props} />
//     </NavigationMenu.Link>
//   );
// };

// const renderMenuItems = (items: TLinkNavigation[]) => {
//   return items.map((item) =>
//     !item.children ? (
//       <NavigationMenuItem key={item.path}>
//         <Link href={item.path} legacyBehavior passHref>
//           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//             {item.label}
//           </NavigationMenuLink>
//         </Link>
//       </NavigationMenuItem>
//     ) : (
//       <NavigationMenuItem key={item.path}>
//         <NavigationMenuTrigger>
//           <Link href={item.path}>{item.label}</Link>
//         </NavigationMenuTrigger>
//         <NavigationMenuContent className="bg-background rounded p-2"></NavigationMenuContent>
//       </NavigationMenuItem>
//     ),
//   );
// };

// const renderItemChildren = (items: TLinkNavigation[]) => {
//   return items.map((item) =>
//     !item.children ? (
//       <NavigationMenuLink href={item.path}>{item.label}</NavigationMenuLink>
//     ) : (
//       <></>
//     ),
//   );
// };
