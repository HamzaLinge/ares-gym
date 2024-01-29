import React from "react";
import AddBtnLink from "@/components/custom/AddBtnLink";

type THeaderPageProps = {
  children: React.ReactNode;
  pathAddBtnLink: string;
  title: string;
};

export default function HeaderPage({
  children,
  title,
  pathAddBtnLink,
}: THeaderPageProps) {
  return (
    <header className={"mb-4 flex w-full flex-col"}>
      <div className={"flex items-center"}>
        <AddBtnLink path={pathAddBtnLink} text={"New Category!"} />
        <div className={"ml-4 border border-l"}>{children}</div>
      </div>
      <div className={"relative mt-4 flex w-full items-center justify-center"}>
        <p className={"bg-bg-100 px-2 text-sm text-text-100"}>
          List <span className={"capitalize"}>{title}</span>
        </p>
        <span
          className={"absolute -z-10 w-full border border-b border-bg-200"}
        ></span>
      </div>
    </header>
  );
}
