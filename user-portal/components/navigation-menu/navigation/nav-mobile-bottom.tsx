import Link from "next/link";
import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { LiaShippingFastSolid } from "react-icons/lia";

export default async function NavMobileBottom() {
  const links = [
    { Icon: HiOutlineHome, label: "Home", path: "/" },
    { Icon: HiOutlineShoppingBag, label: "Shop", path: "/shop" },
    { Icon: HiOutlineHeart, label: "Wishlist", path: "/wishlist" },
    { Icon: LiaShippingFastSolid, label: "Checkout", path: "/checkout" },
  ];

  return (
    <header className="bg-background fixed bottom-0 left-0 right-0 z-10 grid grid-cols-4 justify-items-center shadow-[0_0_9px_rgba(0,0,0,0.15)] lg:hidden">
      {links.map(({ Icon, label, path }) => (
        <Link key={path} href={path}>
          <p className="flex w-full flex-col items-center gap-y-1 p-1 text-sm">
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </p>
        </Link>
      ))}
    </header>
  );
}
