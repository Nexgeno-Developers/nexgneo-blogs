import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";
import { getUsers } from "@/actions/getUsers";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

const AdminClient = async () => {
  const user = await currentUser();

  if (user?.role !== UserRole.ADMIN) {
    redirect("/admin");
  }
  const users = await getUsers();
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Employ (${users.length})`}
          description="Manage Employ  For Your Company"
        />
        <Link href="/admin/user-management/new">
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
          placeholder="Search a Employ..."
          columns={columns}
          data={users}
        />
      </div>
    </>
  );
};

export default AdminClient;
