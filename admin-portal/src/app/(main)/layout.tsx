import React from "react";
import NavigationLayout from "@/app/(main)/_components/NavigationLayout";
import { Toaster } from "@/components/ui/sonner";

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
          "ml-0 mt-20 flex flex-1 flex-col overflow-auto p-2 transition-margin lg:ml-64"
        }
      >
        {children}
      </main>
      <Toaster richColors />
    </section>
  );
}
