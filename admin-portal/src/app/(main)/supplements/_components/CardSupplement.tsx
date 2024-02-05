import Image from "next/image";
import { ISupplement } from "@/app/(main)/supplements/_utils/types";
import Link from "next/link";
import { routePaths } from "@/utils/route-paths";

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
      <div className={"flex w-full flex-col"}>
        <Image
          className={"mx-0 h-auto w-full"}
          src={srcImg}
          alt={"supplement thumbnail"}
          width={5472}
          height={3648}
          sizes="256px"
        />
        <p>{supplement.name}</p>
        <p>{supplement.price}</p>
      </div>
    </Link>
  );
}
