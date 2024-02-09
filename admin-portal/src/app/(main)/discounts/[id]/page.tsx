import React from "react";
import { getDiscountById } from "@/app/(main)/discounts/_utils/actions";
import Image from "next/image";
import { getFileUrl } from "@/utils/helpers";

type TDiscountPageProps = {
  params: { id: string };
};

export default async function DiscountPage({
  params: { id },
}: TDiscountPageProps) {
  const discount = await getDiscountById(id);
  return (
    <section className={"flex w-full items-center"}>
      <div className={"w-1/2"}>
        <Image
          className={"mx-0 h-auto w-full"}
          src={getFileUrl(discount.thumbnail)}
          alt={discount.title}
          width={5472}
          height={3648}
          sizes="256px"
        />
      </div>
      <div>
        <h1>{discount.title}</h1>
        <p>{discount.description}</p>
      </div>
    </section>
  );
}
