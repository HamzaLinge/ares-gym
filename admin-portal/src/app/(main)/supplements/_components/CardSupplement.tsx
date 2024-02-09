import Image from "next/image";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import Link from "next/link";
import { routePaths } from "@/utils/route-paths";
import { getFileUrl } from "@/utils/helpers";

interface ICardSupplementProps {
  supplement: ISupplement;
}

export default function CardSupplement({ supplement }: ICardSupplementProps) {
  let srcImg: string;
  if (supplement.thumbnails && supplement.thumbnails.length > 0) {
    srcImg = `${process.env.BASE_URL}/file/${supplement.thumbnails[0]}`;
  } else {
    srcImg = "default-supplement-thumbnails.jpeg";
  }
  return (
    <Link
      href={routePaths.supplements.children.supplement.path(supplement._id)}
    >
      <div
        className={
          "flex w-full flex-col bg-white rounded overflow-hidden border shadow hover:shadow-xl group"
        }
      >
        <div className={"w-full aspect-square relative overflow-hidden"}>
          <Image
            src={getFileUrl(supplement.thumbnails)}
            alt={supplement.name}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={
              "(max-width: 640px) 100vw, (max-width: 768px) 33.33vw, (max-width: 1024px) 25vw, 20vw"
            }
            className={
              "transition-all group-hover:scale-110 group-hover:brightness-50"
            }
          />
        </div>
        <div className={"w-full flex justify-between p-2"}>
          <h3 className={"capitalize font-semibold"}>{supplement.name}</h3>
          <p className={"italic font-light"}>{supplement.price} DA</p>
        </div>
      </div>
    </Link>
  );
}
