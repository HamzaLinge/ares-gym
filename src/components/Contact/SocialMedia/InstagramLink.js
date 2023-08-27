import React from "react";
import { FaInstagramSquare } from "react-icons/fa";

function InstagramLink() {
  return (
    <a href={"https://www.instagram.com/ares_gym27/"} target="_blank">
      <FaInstagramSquare className={"h-14 w-14 text-blue-200"} />
    </a>
  );
}

export default InstagramLink;
