import { Skeleton } from "@/components/ui/skeleton";
export const SkeletonButton = (): JSX.Element => {
  return (
    <div className="flex items-center ">
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
};
