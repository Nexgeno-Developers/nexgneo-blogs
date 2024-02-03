import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const AllPostClient = async () => {
  const user = await currentUser();
  const data = await db.post.findMany({
    where: {
      authorId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`My Post (${data.length})`}
          description="Manage all post of your employ and your post here"
        />
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-5">
        <DataTable
          searchKey="title"
          placeholder="Search a Post..."
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
};

export default AllPostClient;
