import Link from "next/link";

export default function HeaderProduct() {
  return (
    <header className={"flex w-full items-center justify-center gap-x-4 p-2"}>
      <p>Dashboard Products</p>
      <Link href={"/products/new"}>
        <button className={"btn_nav"}>New</button>
      </Link>
    </header>
  );
}
