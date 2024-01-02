import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={"flex"}>
      <nav className={"sticky top-0 h-36 w-full bg-primary-100"}></nav>

      <nav className={"absolute w-52 -translate-x-full bg-white shadow-md"}>
        <div className={"flex h-20 items-center justify-center shadow-md"}>
          {/* Logo */}
          <Image
            src="/path-to-your-logo.png"
            alt="Logo"
            width={100}
            height={50}
          />
        </div>
        <nav>
          <ul>
            {/* Navigation Links */}
            <li className="py-2 pl-6 hover:bg-gray-100">
              <Link href="/dashboard">
                <span>Link 1</span>
              </Link>
            </li>
            <li className="py-2 pl-6 hover:bg-gray-100">
              <Link href="/dashboard">
                <span>Link 2</span>
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </nav>
      <div className={"flex-1"}>{children}</div>
    </section>
  );
}
