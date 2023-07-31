import React from "react";

function Header() {
  return (
    <header
      className={
        "absolute left-0 right-0 top-10 z-10 grid grid-cols-4 justify-items-center font-albert-sans text-xs text-zinc-100"
      }
    >
      <p className={"btn_header"}>Logo</p>
      <p className={"btn_header"}>Aperçu</p>
      <p className={"btn_header"}>Prix</p>
      <p className={"btn_header"}>Contact</p>
    </header>
  );
}

export default Header;
