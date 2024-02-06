"use client";
import Image from "next/image";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillPostcardFill } from "react-icons/bs";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

interface SidebarProps {
  name?: string | null;
  image?: string | null;
}

const Sidebar = ({ name, image }: SidebarProps) => {
  const pathname = usePathname();
  const user = useCurrentUser();

  const menuItems = [
    {
      id: 1,
      title: "Pages",
      list: [
        {
          id: 1,
          title: "Dashboard",
          path: "/admin",
          icon: <MdDashboard size={30} />,
        },
        {
          id: 3,
          title: "My Posts",
          path: "/admin/posts",
          icon: <BsFillPostcardFill size={30} />,
        },
        {
          id: 4,
          title: "Categories",
          path: "/admin/categories",
          icon: <BiSolidCategory size={30} />,
        },
        {
          id: 5,
          title: "Profile",
          path: `/admin/profile`,
          icon: <MdOutlineSettings size={30} />,
        },
      ],
    },
  ];

  return (
    <>
      <div className="sticky top-10">
        <div className="flex items-center gap-5 mb-5">
          <div className="relative h-14 w-14">
            <Image
              className="rounded-full object-cover"
              src={image || "/noavatar.png"}
              alt="profile"
              fill={true}
              key={"item._id"}
            />
          </div>

          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
          </div>
        </div>
        <ul className="list-none">
          {menuItems.map((cat) => (
            <li key={cat.id}>
              <span className="font-bold text-xs my-2">{cat.title}</span>
              {cat.list.map((item) => (
                <>
                  <Link
                    href={item.path}
                    key={item.id}
                    className={`p-5 flex items-center gap-5 my-1 rounded-lg border-[1px]   ${
                      pathname === item.path &&
                      " text-[#17c1e8] font-semibold shadow-lg"
                    } `}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </>
              ))}
            </li>
          ))}

          {user?.role === UserRole.ADMIN && (
            <li>
              <span className="font-bold text-xs my-2">Admin</span>
              <Link
                href="/admin/user-management"
                className={`p-5 flex items-center gap-5 my-1 rounded-lg border-[1px]   ${
                  pathname === "/admin/user-management" &&
                  " text-[#17c1e8] font-semibold shadow-lg"
                } `}
              >
                <FaUser />
                User Management
              </Link>
              <Link
                href="/admin/all-post"
                className={`p-5 flex items-center gap-5 my-1 rounded-lg border-[1px]   ${
                  pathname === "/admin/all-post" &&
                  "text-[#17c1e8] font-semibold shadow-lg"
                } `}
              >
                <BsFillPostcardFill />
                All Post
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
