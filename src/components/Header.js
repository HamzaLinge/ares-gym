import React from "react";

function Header() {
  return (
    <header
      className={
        "absolute left-0 top-0 grid w-full grid-cols-3 justify-items-center font-albert-sans text-xs text-zinc-100"
      }
    >
      <p className={"btn_header"}>Insight</p>
      <p className={"btn_header"}>Logo</p>
      <p className={"btn_header"}>Membership</p>
    </header>
  );
}

export default Header;
