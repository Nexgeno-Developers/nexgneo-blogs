import { getCategories } from "@/actions/getCategories";
import { CategoriesList } from "./_components/categories-list";
import { getPosts } from "@/actions/getPosts";
import { PostsList } from "./_components/posts-lists";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { EnquireForm } from "./_components/enquire-form";
import { ServicesList } from "./_components/services-list";

interface HomePageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const categories = await getCategories();

  const posts = await getPosts({
    ...searchParams,
  });

  const latestPost = posts[0];

  return (
    <>
      <section className="py-10">
        <div className="container relative">
          <Link href={`/posts/${latestPost.slug}`}>
            <div className="relative aspect-video ">
              <Image
                alt="blog img"
                fill
                src={latestPost.image}
                className="rounded-2xl"
              />
            </div>
            <div className="absolute inset-0 px-5">
              <div className="absolute inset-x-[16px] rounded-b-2xl bottom-0 h-2/5 bg-black opacity-80"></div>
            </div>
            <div className="flex flex-col gap-4 absolute left-10 max-w-2xl bottom-5 ">
              <div>
                <Badge variant="secondary" className="py-2 px-4">
                  <Clock className="mr-3" />
                  {format(latestPost?.createdAt!, "MMMM do, yyyy")}
                </Badge>
              </div>

              <h1 className="text-2xl font-bold text-white line-clamp-2">
                {latestPost.title}
              </h1>
              <p className="text-white line-clamp-3">
                {latestPost.description}
              </p>
              <div className="flex items-center text-white gap-2 hover:text-red-600 hover:gap-4 transition-all  font-bold">
                Read More
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
        <div className="container mt-10">
          <div className="mb-5 ">
            <span className="border-b-[3px] pb-1 border-black font-bold text-2xl">
              Trending
            </span>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
            <PostsList items={posts} />
            <div className="">
              <div className="sticky top-20">
                <SearchInput />
                <div className="mt-5">
                  <span className="border-b-[2px] pb-1 border-black font-semibold text-xl">
                    Categories
                  </span>
                </div>
                <CategoriesList items={categories} />
                <EnquireForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="">
            <span className="border-b-[2px] pb-1 border-black font-semibold text-xl">
              Services
            </span>
          </div>
          <ServicesList items={posts} />
        </div>
      </section>

      {/* <section>
        <div className="container">
          <div className="py-6 space-y-4">
            <CategoriesList items={categories} />
            <PostsList items={posts} />
          </div>
        </div>  
      </section> */}
    </>
  );
};

export default HomePage;
