import React from "react";
import { Link } from "react-scroll";
import { cn } from "../../utils";

function Header() {
  return (
    <header
      className={
        "fixed left-0 right-0 top-0 z-20 grid h-16 grid-cols-5 items-center justify-items-center bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.2)] font-albert-sans shadow backdrop-blur-sm"
      }
    >
      <p className={"btn_header"}>
        <Link
          activeClass={"text-yellow-400"} // Optional: Apply styling to the active link
          to="insight"
          spy={true}
          smooth={true}
          offset={-63} // Optional: Offset for scroll position
          duration={500} // Optional: Duration of the scroll animation
        >
          Aperçu
        </Link>
      </p>

      <p className={"btn_header"}>
        <Link
          activeClass={"text-yellow-400"} // Optional: Apply styling to the active link
          to="hours"
          spy={true}
          smooth={true}
          offset={-63} // Optional: Offset for scroll position
          duration={500} // Optional: Duration of the scroll animation
        >
          Horaires
        </Link>
      </p>

      <img
        src={"/logos/ares-gym-yellow-logo.png"}
        alt={""}
        className={"h-6 object-contain sm:h-10"}
      />

      <p className={"btn_header"}>
        <Link
          activeClass={"text-yellow-400"} // Optional: Apply styling to the active link
          to="offers"
          spy={true}
          smooth={true}
          offset={-63} // Optional: Offset for scroll position
          duration={500} // Optional: Duration of the scroll animation
        >
          Offres
        </Link>
      </p>
      <p className={"btn_header"}>
        <Link
          activeClass={"text-yellow-400"} // Optional: Apply styling to the active link
          to="contact"
          spy={true}
          smooth={true}
          offset={-63} // Optional: Offset for scroll position
          duration={500} // Optional: Duration of the scroll animation
        >
          Contact
        </Link>
      </p>
    </header>
  );
}

export default Header;
