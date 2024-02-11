"use client";

import BackBtn from "@/app/(main)/_components/BackBtn";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function NavigationPage() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = useMemo(() => {
    let crumbs: string[] = [];
    pathSegments.forEach((segment, index) => {
      if (index - 1 < 0) {
        crumbs.push("/" + segment);
      } else {
        crumbs.push(crumbs[index - 1] + "/" + segment);
      }
    });
    return crumbs;
  }, [pathname]);

  return (
    <nav aria-label={"Breadcrumb"} className={"mb-4 flex items-center h-10"}>
      {breadcrumbs.length >= 2 && (
        <BackBtn href={breadcrumbs[breadcrumbs.length - 2]} />
      )}
      <ol className={"flex items-center self-center ml-4"}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className={"flex items-center"}>
            <Link href={breadcrumb}>
              <span className={"font-light text-sm italic hover:underline"}>
                /{breadcrumb.split("/").pop()}
              </span>
            </Link>
            {index < breadcrumbs.length - 1 && (
              <ArrowRightIcon className="mx-2 text-text-100" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
