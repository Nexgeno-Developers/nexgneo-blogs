import { getCategories } from "@/actions/getCategories";
import { CategoriesList } from "./_components/categories-list";
import { getPosts } from "@/actions/getPosts";
import { PostsList } from "./_components/posts-lists";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Eye } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { EnquireForm } from "./_components/enquire-form";
import { ServicesList } from "./_components/services-list";
import { db } from "@/lib/db";

interface HomePageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const categories = await getCategories();

  const services = await db.services.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const posts = await getPosts({
    ...searchParams,
  });

  const latestPost = posts[0];

  return (
    <>
      <section className="py-10">
        <div className="pb-20">
          <h1 className="text-center text-4xl font-semibold mb-3">
            Nexgeno Blog test
          </h1>
          <p className="text-center">
            Latest news, insights, and trends in the world of technology. Our
            team of experts offers actionable <br /> advice to leverage
            technology and drive business success.
          </p>
        </div>

        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center text-2xl text-muted-foreground mt-10 min-h-[10vh]">
              No Blogs found
            </div>
          ) : (
            <Link
              href={`/posts/${latestPost.slug}`}
              className="grid md:grid-cols-2 grid-cols-1 gap-8"
            >
              <div className="relative aspect-video ">
                <Image
                  alt="blog img"
                  fill
                  src={latestPost.image}
                  className="rounded-2xl hover:grayscale transition"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    <Clock className="mr-3" />
                    {format(latestPost?.createdAt!, "MMMM do, yyyy")}
                  </Badge>
                  {/* <Badge variant="secondary">
                <Eye className="mr-3" />
                {latestPost?.views}
              </Badge> */}
                </div>

                <h2 className="text-2xl font-bold  line-clamp-2">
                  {latestPost.title}
                </h2>
                <p className=" line-clamp-3">{latestPost.description}</p>
                <div className="flex items-center  gap-2 hover:text-red-600 hover:gap-4 transition-all  font-bold">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          )}
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

      {/* <section className="py-10">
        <div className="container">
          <div className="">
            <span className="border-b-[2px] pb-1 border-black font-semibold text-xl">
              Services
            </span>
          </div>
          <ServicesList items={services} />
        </div>
      </section> */}

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
