"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function SortForm() {
  const router = useRouter();

  const sortBy = [
    {
      label: "Latest",
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

  return (
    <Select onValueChange={(value) => router.push(`/shop?sortBy=${value}`)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortBy.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
              //   onClick={() => router.push(`/shop?sortBy=${value}`)}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
