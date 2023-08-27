import React from "react";
import InstagramLink from "@/components/Contact/SocialMedia/InstagramLink";
import WhatsappLink from "@/components/Contact/SocialMedia/WhatsappLink";

function SocialMedia() {
  return (
    <div className={"flex w-full grow items-center justify-evenly pb-10"}>
      <InstagramLink />
      <WhatsappLink />
    </div>
  );
}

export default SocialMedia;
