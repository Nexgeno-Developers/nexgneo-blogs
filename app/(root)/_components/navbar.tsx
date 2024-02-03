"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isSearchPage = pathname === "/";
  return (
    <>
      <nav className={cn("sticky top-0 w-full z-40 py-2 bg-white")}>
        <div className="container ">
          <div className="flex items-center  justify-between">
            <Link href="/">
              <div className="relative w-[200px] h-[50px]">
                <Image
                  src="/logo.webp"
                  alt="Nexgeno Logo"
                  fill={true}
                  className="object-contain"
                />
              </div>
            </Link>
            {isSearchPage && (
              <div className="hidden md:block">
                <SearchInput />
              </div>
            )}
            <div className="flex items-center gap-10">
              <Link href="tel:+919004466166">+91 90044 66166</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
