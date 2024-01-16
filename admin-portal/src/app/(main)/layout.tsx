import React from "react";
import NavigationLayout from "@/app/(main)/components/NavigationLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"relative flex flex-1 flex-col"}>
      <NavigationLayout />
      <main
        className={
          "ml-0 mt-20 flex flex-1 flex-col overflow-auto p-2 transition-margin md:ml-64"
        }
      >
        {children}
      </main>
    </section>
  );
}
