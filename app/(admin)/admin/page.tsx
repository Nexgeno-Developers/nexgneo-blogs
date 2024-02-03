import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { MdSupervisedUserCircle } from "react-icons/md";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import { getCategories } from "@/actions/getCategories";
import { getUsers } from "@/actions/getUsers";
import { getMyPosts } from "@/actions/getMyPost";

const Admin = async () => {
  const data = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const myPosts = await getMyPosts();

  const users = await getUsers();

  const categories = await getCategories();

  return (
    <>
      <>
        <div className="mt-5">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 justify-between">
              <div className="border-[1px] p-5 rounded-lg flex justify-between items-center gap-5 cursor-pointer shadow-lg w-full">
                <div className="flex flex-col gap-2">
                  <span className="">My Post</span>
                  <span className="text-2xl font-medium">{myPosts.length}</span>
                </div>
                <div className="w-14 h-14 rounded-md grid place-items-center bg-gradient-to-tr from-[#ec068b] to-[#8e22bf]">
                  <MdSupervisedUserCircle size={30} className="text-white" />
                </div>
              </div>
              <div className="border-[1px] p-5 rounded-lg flex justify-between items-center gap-5 cursor-pointer shadow-lg w-full">
                <div className="flex flex-col gap-2">
                  <span className="">Total Post</span>
                  <span className="text-2xl font-medium">{data.length}</span>
                </div>
                <div className="w-14 h-14 rounded-md grid place-items-center bg-gradient-to-tr from-[#ec068b] to-[#8e22bf]">
                  <MdSupervisedUserCircle size={30} className="text-white" />
                </div>
              </div>
              <div className="border-[1px] p-5 rounded-lg flex justify-between items-center gap-5 cursor-pointer shadow-lg w-full">
                <div className="flex flex-col gap-2">
                  <span className="">Total Category</span>
                  <span className="text-2xl font-medium">
                    {categories.length}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-md grid place-items-center bg-gradient-to-tr from-[#ec068b] to-[#8e22bf]">
                  <MdSupervisedUserCircle size={30} className="text-white" />
                </div>
              </div>
              <div className="border-[1px] p-5 rounded-lg flex justify-between items-center gap-5 cursor-pointer shadow-lg w-full">
                <div className="flex flex-col gap-2">
                  <span className="">Total User</span>
                  <span className="text-2xl font-medium">{users.length}</span>
                </div>
                <div className="w-14 h-14 rounded-md grid place-items-center bg-gradient-to-tr from-[#ec068b] to-[#8e22bf]">
                  <MdSupervisedUserCircle size={30} className="text-white" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <Heading
                title={`Latest Post (${data.length})`}
                description="Latest all post of your and your company employ here"
              />
            </div>
            <Separator />
            <div className="mt-5">
              <DataTable
                searchKey="title"
                placeholder="Search Latest Post..."
                columns={columns}
                data={data}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Admin;
