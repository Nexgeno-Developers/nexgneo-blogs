import { getCategories } from "@/actions/getCategories";
import { CategoriesList } from "./_components/categories-list";
import { getPosts } from "@/actions/getPosts";
import { PostsList } from "./_components/posts-lists";

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

  return (
    <>
      <section>
        <div className="container">
          <div className="py-6 space-y-4">
            <CategoriesList items={categories} />
            <PostsList items={posts} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
