import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

const ResultsPage = async () => {
  const results = await db.result.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Our Results (${results.length})`}
          description="Manage all result items for your website"
        />
        <Link href="/admin/results/new">
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
          placeholder="Search a result by title..."
          columns={columns}
          data={results}
        />
      </div>
    </>
  );
};

export default ResultsPage;
