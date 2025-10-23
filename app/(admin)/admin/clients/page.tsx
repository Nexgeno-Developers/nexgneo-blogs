import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
// import { Clients } from "@prisma/client";
const ClientsPage = async () => {
  const clients = await db.client.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Our Clients (${clients.length})`}
          description="Manage all client logos for your website"
        />
        <Link href="/admin/clients/new">
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
          placeholder="Search a client by name..."
          columns={columns}
          data={clients}
        />
      </div>
    </>
  );
};

export default ClientsPage;
