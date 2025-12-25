import AddPostForm from "./_components/add-post-form";
import { getCategories } from "@/actions/getCategories";

const PostCreatePage = async () => {
  try {
    const categories = await getCategories();

    // Ensure categories is an array and handle null/undefined
    const categoryOptions = Array.isArray(categories)
      ? categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))
      : [];

    return (
      <>
        <AddPostForm options={categoryOptions} />
      </>
    );
  } catch (error) {
    console.error("Error loading categories:", error);
    // Return form with empty options if there's an error
    return (
      <>
        <AddPostForm options={[]} />
      </>
    );
  }
};

export default PostCreatePage;
