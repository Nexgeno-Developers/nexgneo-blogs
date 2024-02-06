"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdLogout, MdPublic, MdSearch } from "react-icons/md";

const TopBar = () => {
  const router = useRouter();

  return (
    <>
      <div className="p-5 border-[1px] rounded-lg  shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-5  p-2 rounded-lg border-[1px]">
          <MdSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex gap-5 items-center">
            <MdPublic
              onClick={() => router.push("/")}
              className="cursor-pointer"
              size={20}
            />

            <button onClick={() => signOut({ callbackUrl: "/" })}>
              <MdLogout size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
