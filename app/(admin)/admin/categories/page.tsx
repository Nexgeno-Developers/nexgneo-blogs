import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";
import { getCategories } from "@/actions/getCategories";

const Categories = async () => {
  const categories = await getCategories();

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage Category for your blog Website"
        />
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-5">
        <DataTable
          searchKey="name"
          placeholder="Search a Category..."
          columns={columns}
          data={categories}
        />
      </div>
    </>
  );
};

export default Categories;
