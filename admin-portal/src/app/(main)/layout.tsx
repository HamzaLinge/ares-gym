import NavigationLayout from "@/app/(main)/_components/NavigationLayout";
import NavigationPage from "@/app/(main)/_components/NavigationPage";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"text-foreground relative flex flex-1 flex-col"}>
      <NavigationLayout />
      <main
        className={
          "bg-background transition-margin ml-0 mt-20 flex flex-1 flex-col overflow-auto p-2 lg:ml-64"
        }
      >
        <NavigationPage />
        {children}
      </main>
      <Toaster richColors />
    </section>
  );
}
