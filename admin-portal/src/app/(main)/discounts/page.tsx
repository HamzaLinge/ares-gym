import React from "react";
import HeaderDiscounts from "@/app/(main)/discounts/_components/HeaderDiscounts";
import { getDiscounts } from "@/app/(main)/discounts/_utils/actions";
import TableDiscount from "@/app/(main)/discounts/_components/TableDiscount";

export default async function DiscountsPage() {
  const discounts = await getDiscounts();
  return (
    <div>
      <HeaderDiscounts />
      <TableDiscount discounts={discounts} />
    </div>
  );
}
