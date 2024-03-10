import Image from "next/image";
import { TSupplement } from "@/types/supplement";
import Link from "next/link";

export default function ShopCard({ supplement }: { supplement: TSupplement }) {
  return (
    <div className="w-full space-y-2">
      <Link href={`/shop/${supplement._id}`}>
        <div className={"relative aspect-square w-full overflow-hidden"}>
          <Image
            src={getFileUrl(supplement.thumbnails)}
            alt={supplement.name}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={
              "(max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 20vw"
            }
            className={
              "transition-all group-hover:scale-110 group-hover:brightness-50"
            }
          />
        </div>
      </Link>
      <div>
        <Link href={`/shop/${supplement._id}`}>
          <h3 className="font-semibold capitalize">{supplement.name}</h3>
        </Link>
        <p>{supplement.price} DZD</p>
      </div>
    </div>
  );
}

export function getFileUrl(idFile: string | string[] | undefined) {
  if (typeof idFile === "string")
    return `${process.env.BASE_URL}/file/${idFile}`;
  if (
    Array.isArray(idFile) &&
    idFile.length > 0 &&
    typeof idFile[0] === "string"
  )
    return `${process.env.BASE_URL}/file/${idFile[0]}`;
  return "/default-supplement-thumbnail.jpg";
}
