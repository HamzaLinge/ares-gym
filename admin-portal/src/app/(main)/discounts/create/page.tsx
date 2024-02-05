import React from "react";
import FormDiscount from "@/app/(main)/discounts/_components/FormDiscount";
import { createDiscount } from "@/app/(main)/discounts/_utils/actions";

export default function CreateDiscountPage() {
  return (
    <section>
      <FormDiscount actionDiscount={createDiscount} />
    </section>
  );
}
