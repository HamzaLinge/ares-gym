import React from "react";

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
