import { getCategoryLinks } from "@/actions/menu";
import MenuMobile from "@/components/navigation-menu/menu/menu-mobile";
import NavDesktop from "@/components/navigation-menu/navigation/nav-desktop";
import NavMobile from "@/components/navigation-menu/navigation/nav-mobile";
import NavMobileBottom from "@/components/navigation-menu/navigation/nav-mobile-bottom";
import { TLinkNavigation } from "@/types/ui";

export default async function LayoutNavigationMenu() {
  const categoryLinks = await getCategoryLinks();

  const navLinks: TLinkNavigation[] = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop", children: categoryLinks },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  return (
    <header className="bg-background sticky left-0 top-0 z-10 grid grid-cols-3 items-center justify-items-center gap-2 px-6 py-2 shadow-md">
      <NavMobile links={navLinks} />
      <NavMobileBottom />
      <p>Logo</p>
      <NavDesktop />
      <MenuMobile />
    </header>
  );
}
