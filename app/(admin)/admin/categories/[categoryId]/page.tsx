import { db } from "@/lib/db";
import UpdateCategoryForm from "./_components/update-category-form";

const CategoryIdPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <>
      <div className="max-w-lg">
        <UpdateCategoryForm initialData={category} />
      </div>
    </>
  );
};

export default CategoryIdPage;
