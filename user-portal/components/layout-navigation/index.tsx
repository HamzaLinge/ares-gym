import NavigationDesktop from "@/components/layout-navigation/navigation/navigation-desktop";
import NavigationMobile from "@/components/layout-navigation/navigation/navigation-mobile";

export default function LayoutNavigation() {
  const navLinks = [{ label: "Home", path: "/" }, { label: "Shop" }];

  return (
    <header className="grid grid-cols-3 justify-items-center gap-2 p-4 shadow-md">
      <NavigationMobile />
      <p>Logo</p>
      <NavigationDesktop />
      <div>menu</div>
    </header>
  );
}
