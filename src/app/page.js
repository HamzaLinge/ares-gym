"use client";

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Insight from "@/components/Insight";
import Offers from "@/components/Offers";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Copyright from "@/components/Copyright";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Banner />
      <Insight />
      <Hours />
      <Offers />
      <Contact />
      <Copyright />
    </main>
  );
}
