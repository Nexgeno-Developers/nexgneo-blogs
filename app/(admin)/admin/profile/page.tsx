import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const Profile = async () => {
  const user = await currentUser();

  const data = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-10 mt-10">
        <div className="flex gap-5 relative">
          <div
            className={` border-2 h-72 border-dotted grid place-items-center bg-slate-100 relative rounded-lg w-full  }`}
          >
            <Image
              src={data?.image || "/noavatar.png"}
              fill
              className="absolute object-cover inset-0 rounded-lg"
              alt="Profile Image"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <h2 className="text-xl font-bold">{data?.name}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <h2 className="text-xl font-bold">{data?.email}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <label>Role</label>
              <h2 className="text-xl font-bold">{data?.role}</h2>
            </div>
            <div>
              <Button>
                <Link href={`/admin/profile/${data?.id}`}>Update</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
