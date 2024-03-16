import Search from "@/components/navigation-menu/menu/search";
import ShoppingCart from "@/components/navigation-menu/menu/shopping-cart";

function MenuMobile() {
  return (
    <div className="flex w-full items-center justify-end gap-x-4">
      <Search />
      <ShoppingCart />
    </div>
  );
}

export default MenuMobile;
