import { SkeletonBlog } from "@/components/skeleton-blog";
import { SkeletonCategory } from "@/components/skeleton-category";

const Loading = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
              {Array.from({ length: 7 }, (_, index) => (
                <SkeletonCategory key={index} />
              ))}
            </div>
            <div className="pt-20 flex flex-col gap-10">
              {Array.from({ length: 7 }, (_, index) => (
                <SkeletonBlog key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
