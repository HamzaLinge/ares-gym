import React from "react";
import About from "@/components/Contact/About";
import Links from "@/components/Contact/Links";
import Map from "@/components/Contact/Map";

function Contact() {
  return (
    <section
      id={"contact"}
      className={
        "flex min-h-screen w-full flex-col items-center gap-y-10 bg-gradient-to-b from-zinc-600 to-zinc-900 px-5 py-10 md:px-20"
      }
    >
      <About />
      <Map />
      <Links />
    </section>
  );
}

export default Contact;
