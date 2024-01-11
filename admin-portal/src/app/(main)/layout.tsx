import React from "react";
import NavigationLayout from "@/app/(main)/components/NavigationLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"relative flex grow flex-col"}>
      <NavigationLayout />
      <main className={"mt-20 flex-1 transition-all md:ml-64"}>{children}</main>
    </section>
  );
}
