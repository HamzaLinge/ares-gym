import React from "react";
import TopBar from "@/app/(main)/components/TopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"relative flex w-full"}>
      <nav
        className={
          "absolute left-0 top-0 h-screen w-48 -translate-x-full bg-accent-100"
        }
      ></nav>
      <div className={"relative grow"}>
        <TopBar />
        <div>{children}</div>
      </div>
    </section>
  );
}
