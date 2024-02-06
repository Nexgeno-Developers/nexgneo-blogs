import { Skeleton } from "./ui/skeleton";

export const SkeletonBlog = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <div className="">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full mt-2" />
          <Skeleton className="h-4 w-full mt-10" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-28 mt-5" />
        </div>
        <div className="">
          <Skeleton className="aspect-video" />
        </div>
      </div>
    </>
  );
};
