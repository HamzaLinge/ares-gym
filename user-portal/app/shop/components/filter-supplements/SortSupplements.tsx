"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createQueryURL } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const sortBy = [
  {
    label: "Newest",
    value: "updatedAt",
  },
  {
    label: "Price: low to high",
    value: "price",
  },
  {
    label: "Price: high to low",
    value: "price-desc",
  },
];

export default function SortSupplements() {
  const router = useRouter();

  return (
    <Select
      onValueChange={(value) => router.push(createQueryURL({ sortBy: value }))}
    >
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortBy.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
