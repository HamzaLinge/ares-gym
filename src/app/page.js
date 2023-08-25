"use client";

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Insight from "@/components/Insight";
import Plan from "@/components/Membership";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Banner />
      <Insight />
      <Plan />
    </main>
  );
}
