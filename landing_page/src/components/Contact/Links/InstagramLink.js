import React from "react";
import { FaInstagramSquare } from "react-icons/fa";

import { isMobileDevice } from "../../../../utils";

function InstagramLink() {
  const username = "ares_gym27";
  const instagramURL = `https://www.instagram.com/${username}/`;

  const handleClick = () => {
    if (isMobileDevice()) {
      window.location.href = `instagram://user?username=${username}`;
    } else {
      window.open(instagramURL, "_blank");
    }
  };

  return (
    <button className={"flex flex-col items-center"} onClick={handleClick}>
      <FaInstagramSquare className={"h-24 w-24 text-blue-200"} />
      <p className={"text-xs font-light capitalize text-zinc-50"}>
        Nous Visiter
      </p>
    </button>
  );
}

export default InstagramLink;
