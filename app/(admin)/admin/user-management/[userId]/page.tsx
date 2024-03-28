import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import EmployUpdateForm from "./_components/employ-update-form";

const AdminPage = async ({ params }: { params: { userId: string } }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <>
      <EmployUpdateForm initialData={user} />
    </>
  );
};

export default AdminPage;
