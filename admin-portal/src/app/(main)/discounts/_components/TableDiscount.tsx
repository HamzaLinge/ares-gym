"use client";

import React from "react";
import { TDiscount } from "@/app/(main)/discounts/_utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/custom/DataTable";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routePaths } from "@/utils/route-paths";
import BtnLink from "@/components/custom/BtnLink";

type TTableDiscountProps = {
  discounts: TDiscount[];
};

export const columns: ColumnDef<TDiscount>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = String(row.getValue("title"));
      return <span className={"capitalize"}>{title}</span>;
    },
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Percentage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dateBegin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateBegin = String(row.getValue("dateBegin"));
      const formattedDateBegin = format(dateBegin, "PPP");
      return formattedDateBegin;
    },
  },
  {
    accessorKey: "dateEnd",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"justify-start"}
        >
          To
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateEnd = String(row.getValue("dateEnd"));
      const formattedDateEnd = format(dateEnd, "PPP");
      return formattedDateEnd;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const discount = row.original;

      return (
        <BtnLink
          path={routePaths.discounts.children.discount.path(discount._id)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </BtnLink>
      );
    },
  },
];

export default function TableDiscount({ discounts }: TTableDiscountProps) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={discounts} />
    </div>
  );
}
