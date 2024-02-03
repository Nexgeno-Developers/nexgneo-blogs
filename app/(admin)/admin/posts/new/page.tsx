import AddPostForm from "./_components/add-post-form";
import { getCategories } from "@/actions/getCategories";

const PostCreatePage = async () => {
  const categories = await getCategories();

  return (
    <>
      <AddPostForm
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </>
  );
};

export default PostCreatePage;
