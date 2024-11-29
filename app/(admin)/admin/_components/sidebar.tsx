"use client";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillPostcardFill } from "react-icons/bs";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  Building2,
  Code,
  Lightbulb,
  Ratio,
  UsersRound,
  Map,
  User2,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { GrServices } from "react-icons/gr";
import { UserRole } from "@prisma/client";
import { UserButton } from "./user-button";

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
          icon: <MdDashboard />,
        },
        {
          id: 2,
          title: "My Posts",
          path: "/admin/posts",
          icon: <BsFillPostcardFill />,
        },
        {
          id: 3,
          title: "Categories",
          path: "/admin/categories",
          icon: <BiSolidCategory />,
        },
      ],
    },
  ];
  const adminRoutes = [
    {
      id: 1,
      title: "Admin",
      list: [
        {
          id: 1,
          title: "User Management",
          path: "/admin/user-management",
          icon: <FaUser />,
        },
        {
          id: 2,
          title: "All Post",
          path: "/admin/all-post",
          icon: <BsFillPostcardFill />,
        },
        {
          id: 3,
          title: "Leads",
          path: "/admin/leads",
          icon: <FaMessage />,
        },
        {
          id: 4,
          title: "Services",
          path: "/admin/services",
          icon: <GrServices />,
        },
        {
          id: 5,
          title: "Hire Developer",
          path: "/admin/hire-developer",
          icon: <Code />,
        },
        {
          id: 6,
          title: "Industries",
          path: "/admin/industries",
          icon: <Building2 />,
        },
        {
          id: 7,
          title: "Solutions",
          path: "/admin/solutions",
          icon: <Lightbulb />,
        },
        {
          id: 8,
          title: "Our Clients",
          path: "/admin/clients",
          icon: <User2 />,
        },
      ],
    },
  ];

  return (
    <>
      <div className="sticky top-10">
        <Link href="/">
          <Image
            width={200}
            height={60}
            alt="logo"
            src="/logo.webp"
            className="mb-3"
          />
        </Link>

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
            <>
              {adminRoutes.map((item) => (
                <li key={item.id}>
                  <span className="font-bold text-xs my-2">{item.title}</span>
                  {item.list.map((subItem) => (
                    <Link
                      href={subItem.path}
                      key={subItem.id}
                      className={`p-5 flex items-center gap-5 my-1 rounded-lg border-[1px] ${
                        pathname === subItem.path
                          ? "text-[#17c1e8] font-semibold shadow-lg"
                          : ""
                      }`}
                    >
                      {subItem.icon}
                      {subItem.title}
                    </Link>
                  ))}
                </li>
              ))}

              <li>
                <Link
                  target="_blank"
                  href="https://nexgeno.in/sitemap.xml"
                  className="p-5 flex items-center gap-5 my-1 rounded-lg border-[1px]"
                >
                  <Map className="h-5 w-5" />
                  Sitemap Generate
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
