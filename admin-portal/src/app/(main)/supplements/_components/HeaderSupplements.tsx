import Link from "next/link";

export default function HeaderSupplements() {
  return (
    <header className={"flex w-full items-center justify-center gap-x-4 p-2"}>
      <p>Dashboard Products</p>
      <Link href={"/supplements/create"}>
        <button className={"btn_nav"}>New</button>
      </Link>
    </header>
  );
}
