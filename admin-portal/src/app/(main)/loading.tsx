import { BounceLoader } from "react-spinners";

export default function routerLoading() {
  return (
    <div className={"flex-1 z-30 flex items-center justify-center bg-bg-200"}>
      <BounceLoader color="#36d7b7" />
    </div>
  );
}
