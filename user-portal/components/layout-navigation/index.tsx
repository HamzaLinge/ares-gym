import { getCategoryLinks } from "@/actions/menu.action";
import MenuDesktop from "@/components/layout-navigation/menu/menu-desktop";
import MenuMobile from "@/components/layout-navigation/menu/menu-mobile";
import { TLinkNavigation } from "@/types/ui";

export default async function LayoutNavigation() {
  const categoryLinks = await getCategoryLinks();

  const navLinks: TLinkNavigation[] = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop", children: categoryLinks },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  return (
    <header className="grid grid-cols-3 justify-items-center gap-2 p-4 shadow-md">
      <MenuMobile links={navLinks} />
      <p>Logo</p>
      <MenuDesktop />
      <div>menu</div>
    </header>
  );
}
