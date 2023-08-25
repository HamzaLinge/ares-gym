"use client";

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Insight from "@/components/Insight";
import Membership from "@/components/Membership";
import Hours from "@/components/Hours";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Banner />
      <Insight />
      <Membership />
      <Hours />
    </main>
  );
}
