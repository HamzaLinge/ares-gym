import React from "react";
import TopBar from "@/app/(main)/components/TopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"relative w-full"}>
      <TopBar />
      <div className={"col-span-2"}>{children}</div>
    </section>
  );
}
