import React from "react";
import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";

export const metadata: Metadata = {
  title: routePaths.auth.title,
  description: "",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"flex h-screen w-full items-center justify-center"}>
      {children}
    </section>
  );
}
