import { Post } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface PostsListProps {
  items: Post[];
}

export const PostsList = ({ items }: PostsListProps) => {
  return (
    <>
      <div className="pt-20 flex flex-col gap-10">
        {items.map((item) => (
          <div key={item.id} className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <div className="">
              <Link href={`/${item.slug}`} className="mt-6">
                <h2 className="md:text-2xl text-lg font-semibold text-black mb-3">
                  {item.title}
                </h2>
                <p className="desc mb-3 max-md:hidden line-clamp-5">
                  {item.description}
                </p>
                <p>{format(item?.createdAt!, "MMMM do, yyyy")}</p>
              </Link>
            </div>
            <div className="">
              <Link href={`/${item.slug}`}>
                <div className="relative aspect-video">
                  <Image
                    src={`${item.image}`}
                    fill={true}
                    alt="Blog post"
                    className="rounded-lg object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
