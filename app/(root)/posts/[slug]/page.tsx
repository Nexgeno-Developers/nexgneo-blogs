import { db } from "@/lib/db";
import { Client } from "./_components/client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug as string,
    },
  });

  return {
    title: post?.metaTitle,
    description: post?.metaDesc,
  };
}

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  const fetchPostWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
    return post;
  };

  const post = await fetchPostWithDelay();

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
