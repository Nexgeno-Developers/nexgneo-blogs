import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const HireDeveloperPage = async () => {
  const hireDeveloper = await db.hireDeveloper.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Hire Developer Page (${hireDeveloper.length})`}
          description="Manage all hire developer pages of your Nexgeno Website"
        />
        <Link href="/admin/hire-developer/new">
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
          placeholder="Search a hire hire developer page by title..."
          columns={columns}
          data={hireDeveloper}
        />
      </div>
    </>
  );
};

export default HireDeveloperPage;
