import React from "react";

import AddBtnLink from "@/components/custom/AddBtnLink";

type THeaderPageProps = {
  children: React.ReactNode;
  addBtnLink: { path: string; label?: string };
  listTitle: string;
};

export default function HeaderPage({
  children,
  listTitle,
  addBtnLink,
}: THeaderPageProps) {
  return (
    <header className={"mb-4 flex w-full flex-col"}>
      <div className={"flex items-center"}>
        <AddBtnLink
          path={addBtnLink.path}
          text={addBtnLink.label ? addBtnLink.label : "New!"}
        />
        <div className={"ml-4 border border-l"}>{children}</div>
      </div>
      <div className={"mt-4 flex w-full items-center justify-center"}>
        <span className={"grow border border-b border-bg-200"}></span>
        <p className={"bg-bg-100 px-2 text-sm text-text-100"}>
          List <span className={"capitalize"}>{listTitle}</span>
        </p>
        <span className={"grow border border-b border-bg-200"}></span>
      </div>
    </header>
  );
}
