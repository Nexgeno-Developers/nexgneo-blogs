import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

const AllPostPage = async () => {
  const user = await currentUser();

  if (user?.role !== UserRole.ADMIN) {
    redirect("/dashboard");
  }

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`All Post (${posts.length})`}
          description="Manage all post of your employ and your post here"
        />
      </div>
      <Separator />
      <div className="mt-5">
        <DataTable
          searchKey="title"
          placeholder="Search a Post..."
          columns={columns}
          data={posts}
        />
      </div>
    </>
  );
};

export default AllPostPage;
