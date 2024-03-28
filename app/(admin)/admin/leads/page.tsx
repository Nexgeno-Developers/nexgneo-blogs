import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";

const Leads = async () => {
  const leads = await db.leads.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Leads (${leads.length})`}
          description="Manage all post of your employ and your post here"
        />
      </div>
      <Separator />
      <div className="mt-5">
        <DataTable
          searchKey="name"
          placeholder="Search a Lead..."
          columns={columns}
          data={leads}
        />
      </div>
    </>
  );
};

export default Leads;
