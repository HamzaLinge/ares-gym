import React from "react";
import NavigationLayout from "@/app/(main)/_components/NavigationLayout";
import { Toaster } from "@/components/ui/sonner";
import NavigationPage from "@/app/(main)/_components/NavigationPage";
import { auth } from "@/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log({ session });

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
