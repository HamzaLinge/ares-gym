"use client";

import React, { useState } from "react";
import Header from "@/app/(main)/components/Header";
import Aside from "@/app/(main)/components/Aside";

export default function NavigationLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={"fixed bottom-0 left-0 right-0 top-0 z-10"}>
      <Header setIsOpen={setIsOpen} />
      <Aside isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
