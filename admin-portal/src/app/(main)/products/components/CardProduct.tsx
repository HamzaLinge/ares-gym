import { IProduct } from "@/app/(main)/products/_types";
import Image from "next/image";

interface ICardProductProps {
  product: IProduct;
}

export default function CardProduct(product: ICardProductProps) {
  return (
    <div className={"flex flex-col shadow"}>
      <Image
        src={"/default-supplement-thumbnail.jpg"}
        alt={"Product thumbnail"}
        width={200}
        height={200}
      />
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  );
}
