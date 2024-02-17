"use client";

import React, { useState } from "react";

import Header from "@/app/(main)/_components/Header";
import Aside from "@/app/(main)/_components/Aside";
import { routePaths } from "@/utils/route-paths";

export default function NavigationLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Dashboard", path: routePaths.dashboard.path },
    { title: "Supplements", path: routePaths.supplements.path },
    { title: "Commands", path: routePaths.commands.path },
    { title: "Discounts", path: routePaths.discounts.path },
    { title: "Categories", path: routePaths.categories.path },
    // { title: "Users", path: routePaths.users.path },
    // { title: "Settings", path: routePaths.settings.path },
  ];

  return (
    <div className={"fixed left-0 right-0 top-0 z-10"}>
      <Header setIsOpen={setIsOpen} />
      <Aside isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
    </div>
  );
}
