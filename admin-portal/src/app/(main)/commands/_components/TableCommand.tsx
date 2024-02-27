"use client";

import {
  TCommand,
  TSupplementObject,
} from "@/app/(main)/commands/_utils/types";
import { TUser } from "@/app/auth/_utils/types";
import { DataTable } from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import { routePaths } from "@/utils/route-paths";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

type TTableCommandProps = {
  commands: TCommand[];
};

export const columns: ColumnDef<TCommand>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Orderer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user: TUser | string = row.getValue("user");
      if (typeof user === "string")
        return (
          <span className="font-light italic">Unavailable orderer info</span>
        );
      return (
        <div className="flex w-full items-center justify-center">
          <span className={"capitalize"}>
            {user.firstName} {user.lastName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "supplements",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const supplements: TSupplementObject[] = row.getValue("supplements");
      const totalQuantity = supplements.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0,
      );
      return <span>{totalQuantity}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => {
    //   const dateBegin = String(row.getValue("updatedAt"));
    //   return format(dateBegin, "PPP");
    // },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modification
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateBegin = String(row.getValue("updatedAt"));
      return format(dateBegin, "PPP");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const command = row.original;
      return (
        <Link href={routePaths.commands.children.command.path(command._id)}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      );
    },
  },
];

export default function TableCommand({ commands }: TTableCommandProps) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={commands} />
    </div>
  );
}
