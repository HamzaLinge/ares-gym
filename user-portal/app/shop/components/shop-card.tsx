import Image from "next/image";
import { TSupplement } from "@/types/supplement";
import Link from "next/link";
import { formatPrice, getFileUrl } from "@/utils/helpers";

export default function ShopCard({ supplement }: { supplement: TSupplement }) {
  return (
    <div className="w-full space-y-2">
      <Link href={`/shop/${supplement._id}`}>
        <div className={"group relative aspect-square w-full overflow-hidden"}>
          <Image
            src={getFileUrl(supplement.thumbnails)}
            alt={""}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={
              "(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 20vw"
            }
            className={
              "transition-all duration-300 ease-in-out group-hover:scale-105"
            }
          />
          <Image
            src={getFileUrl(supplement.thumbnails, 1)}
            alt={""}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={
              "(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 20vw"
            }
            className={
              "opacity-0 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-100"
            }
          />
        </div>
      </Link>
      <div>
        <Link href={`/shop/${supplement._id}`}>
          <h3 className="font-semibold capitalize">{supplement.name}</h3>
        </Link>
        <p>{formatPrice(supplement.price)}</p>
      </div>
    </div>
  );
}
