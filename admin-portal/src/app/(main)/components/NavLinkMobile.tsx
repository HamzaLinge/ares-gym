import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Drawer from "@/components/ui/Drawer";
import { routePaths } from "@/utils/route-paths";

export default function NavLinkMobile() {
  const router = useRouter();
  const [isOpenNavLinks, setIsOpenVanLinks] = useState(false);

  const links = [
    { title: "Dashboard", path: routePaths.dashboard.path },
    { title: "Products", path: routePaths.products.path },
    { title: "Commands", path: routePaths.commands.path },
    { title: "Users", path: routePaths.users.path },
    { title: "Settings", path: routePaths.settings.path },
  ];

  return (
    <>
      <button onClick={() => setIsOpenVanLinks(true)}>Navigation</button>
      <Drawer isOpen={isOpenNavLinks} setIsOpen={setIsOpenVanLinks}>
        <nav className={"flex h-full flex-col items-center bg-bg-100"}>
          <h3 className={"w-full border-b border-bg-300 p-4 text-center"}>
            Navigation
          </h3>
          <ul className={"item-center flex w-full flex-col"}>
            {links.map(({ title, path }) => (
              <li
                key={path}
                className={
                  "w-full cursor-pointer border-b border-bg-200 p-4 text-center hover:bg-bg-200"
                }
                onClick={() => {
                  router.push(path);
                  setIsOpenVanLinks(false);
                }}
              >
                {title}
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
}
