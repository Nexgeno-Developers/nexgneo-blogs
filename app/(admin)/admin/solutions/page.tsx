import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const SolutionsPage = async () => {
  const solutions = await db.solutions.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Solutions pages (${solutions.length})`}
          description="Manage all solutions pages of your Nexgeno Website"
        />
        <Link href="/admin/solutions/new">
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
          placeholder="Search a solutions page by title..."
          columns={columns}
          data={solutions}
        />
      </div>
    </>
  );
};

export default SolutionsPage;
