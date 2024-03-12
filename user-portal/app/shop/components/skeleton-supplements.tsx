import { Skeleton } from "@/components/ui/skeleton";

function SkeletonSupplements() {
  const COUNT = 5;

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4">
      {Array.from({ length: COUNT }).map((_, index) => (
        <div key={index} className="w-full space-y-2">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonSupplements;
