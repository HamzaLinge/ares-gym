import React from "react";
import About from "@/components/Contact/About";
import SocialMedia from "@/components/Contact/SocialMedia";

function Contact() {
  return (
    <section
      id={"contact"}
      className={
        "flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-zinc-600 to-zinc-900"
      }
    >
      <About />
      <SocialMedia />
    </section>
  );
}

export default Contact;
