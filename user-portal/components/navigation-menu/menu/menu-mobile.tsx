import { HiOutlineSearch, HiOutlineShoppingCart } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import Search from "@/components/navigation-menu/menu/search";

function MenuMobile() {
  return (
    <div className="flex w-full items-center justify-end gap-x-4">
      <Search />
      <Button variant={"ghost"} size={"icon"}>
        <HiOutlineShoppingCart className="h-7 w-7" />
      </Button>
    </div>
  );
}

export default MenuMobile;
