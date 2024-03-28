import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonBlog = () => {
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div className="mt-5 flex flex-col">
            <Skeleton className="h-6 w-20 " />
            <Skeleton className="h-6 w-full mt-4" />
            <Skeleton className="h-6 w-full mt-1" />
            <Skeleton className="h-6 w-full mt-4 " />
            <Skeleton className="w-1/2 h-6 mt-1" />
            <Skeleton className="w-1/3 h-6 mt-1" />
            <div className="flex items-center gap-5 mt-3">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div>
                <Skeleton className="w-32 h-4  " />
                <Skeleton className="w-32 h-4 mt-1 " />
                <Skeleton className="w-32 h-4 mt-1  " />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="aspect-video" />
          </div>
        </div>
        <div className="mt-20">
          <Skeleton className="w-full h-6 " />
          <Skeleton className="w-11/12 h-6 mt-1 " />
          <Skeleton className="w-10/12 h-6 mt-1 " />
          <Skeleton className="w-1/2 h-6 mt-1 " />
          <Skeleton className="w-1/3 h-6 mt-1 " />
          <Skeleton className="w-1/4 h-6 mt-1 " />
        </div>
      </div>
    </>
  );
};
