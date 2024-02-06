import { db } from "@/lib/db";
import { Client } from "./_components/client";

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug,
      isPublished: true,
    },
    include: {
      author: true,
      category: true,
      postVisitor: true,
    },
  });

  const views = await db.postVisitor.findMany({
    where: {
      postId: post?.id,
    },
  });

  return (
    <>
      <Client
        id={post?.id}
        title={post?.title}
        description={post?.description}
        textEditor={post?.textEditor}
        image={post?.image}
        category={post?.category.name}
        avatar={post?.author.image}
        author={post?.author.name}
        createdAt={post?.createdAt}
        views={views}
      />
    </>
  );
};

export default SlugPage;
