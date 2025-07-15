"use client";

import { SearchInput } from "@/components/search-input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

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

            {/* {isSearchPage && (
              <Suspense>
                <div className="hidden md:block">
                  <SearchInput />
                </div>
              </Suspense>
            )} */}
            <div className="flex items-center gap-10">
              <Link href="tel:+919819555545">+91 9819555545</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
