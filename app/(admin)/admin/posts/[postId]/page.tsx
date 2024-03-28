import { db } from "@/lib/db";
import UpdatePostForm from "./_components/update-post-form";
import { getCategories } from "@/actions/getCategories";

const PostsPage = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  const categories = await getCategories();

  return (
    <>
      <UpdatePostForm
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        initialData={post}
      />
    </>
  );
};

export default PostsPage;
