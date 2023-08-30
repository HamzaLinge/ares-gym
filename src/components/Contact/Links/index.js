import React from "react";
import InstagramLink from "@/components/Contact/Links/InstagramLink";
import CallLink from "@/components/Contact/Links/CallLink";

function Links() {
  return (
    <div
      className={
        "flex w-full grow items-center justify-evenly font-inter-light"
      }
    >
      <CallLink />
      <InstagramLink />
    </div>
  );
}

export default Links;
