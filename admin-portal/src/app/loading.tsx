import { BounceLoader } from "react-spinners";

export default function routerLoading() {
  return (
    <div
      className={
        "absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-bg-200"
      }
    >
      <BounceLoader color="#36d7b7" />
    </div>
  );
}
