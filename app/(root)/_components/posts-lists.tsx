import { Badge } from "@/components/ui/badge";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { ArrowRight, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostsListProps {
  items: Post[];
}

export const PostsList = ({ items }: PostsListProps) => {
  return (
    <>
      <div className="flex  flex-col gap-10 col-span-2">
        {items.map((item) => (
          <div key={item.id} className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <div className="">
              <Link href={`/posts/${item.slug}`}>
                <div className="relative aspect-video">
                  <Image
                    src={`${item.image}`}
                    fill={true}
                    alt="Blog post"
                    className="rounded-lg hover:grayscale transition-all"
                  />
                </div>
              </Link>
            </div>
            <div className="">
              <Link
                href={`/posts/${item.slug}`}
                className="flex flex-col gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="">
                    <Clock className="mr-2" />
                    {format(item?.createdAt!, "MMMM do, yyyy")}
                  </Badge>
                  {/* <Badge variant="secondary">
                    <Eye className="mr-3" />
                    {item?.views}
                  </Badge> */}
                </div>

                <h2 className="md:text-2xl text-lg font-semibold text-black line-clamp-2">
                  {item.title}
                </h2>
                <p className="desc max-md:hidden line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 hover:text-red-600 hover:gap-4 transition-all  font-bold">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-2xl text-muted-foreground mt-10 min-h-[60vh]">
            No Blogs found
          </div>
        )}
      </div>
    </>
  );
};
