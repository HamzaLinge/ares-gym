import { UpdateIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className={"flex flex-1 items-start justify-center"}>
      <UpdateIcon className="h-6 w-6 animate-spin" />
    </div>
  );
}
