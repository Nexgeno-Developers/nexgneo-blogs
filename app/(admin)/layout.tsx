import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./admin/_components/sidebar";
import TopBar from "./admin/_components/topbar";
import { getUser } from "@/actions/getUser";
import { db } from "@/lib/db";
export const metadata = {
  title: "Admin",
  description:
    "Offshore Software Development & IT Consulting Company in mumbai india",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <>
      <SessionProvider session={session}>
        <div className="flex">
          <div className="sidebar p-5 min-h-screen ">
            <Sidebar name={user?.name} image={user?.image} />
          </div>
          <div className="content p-5">
            <TopBar />
            <div className="pt-6">{children}</div>
          </div>
        </div>
      </SessionProvider>
    </>
  );
};

export default AdminLayout;
