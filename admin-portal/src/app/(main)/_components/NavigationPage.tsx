"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRightIcon } from "@radix-ui/react-icons";

import BackBtn from "@/app/(main)/_components/BackBtn";

export default function NavigationPage() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean); // Split and remove any empty strings

  // Consider the first segment as the root for breadcrumb
  const rootSegment = pathSegments[0] || "";
  const isBeyondRoot = pathSegments.length > 1; // True if the current path is beyond the root segment

  const breadcrumbs = useMemo(() => {
    // Generate breadcrumbs, considering special handling for specific segments
    return pathSegments
      .reduce((acc, segment, index, array) => {
        if (
          index > 0 &&
          (segment === "update" || segment === "create") &&
          array.length > index + 1
        ) {
          // Group this segment with the next one
          acc.push(`${segment}/${array[index + 1]}`);
          array.splice(index + 1, 1); // Remove the grouped segment to avoid duplication
        } else if (!acc.includes(segment)) {
          acc.push(segment);
        }
        return acc;
      }, [])
      .map((segment, index) => {
        const url = `/${[rootSegment, ...segment.split("/")]
          .slice(0, index + 1)
          .join("/")}`;
        return { name: "/" + segment, url };
      });
  }, [pathname, rootSegment]);

  const backHref = `/${pathSegments.slice(0, -1).join("/")}` || "/";

  return (
    <nav aria-label="Breadcrumb" className={"mb-4 flex items-center gap-x-4"}>
      {isBeyondRoot && <BackBtn href={backHref} />}
      <ol className={"flex items-center self-center"}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className={"flex items-center"}>
            <Link href={breadcrumb.url}>
              <p
                aria-label={`Navigate to ${breadcrumb.name}`}
                className={"text-sm italic text-text-200"}
              >
                {breadcrumb.name}
              </p>
            </Link>
            {index < breadcrumbs.length - 1 && (
              <ArrowRightIcon className={"mx-2 text-text-100"} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
