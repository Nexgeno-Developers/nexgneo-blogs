"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CategoryItemProps {
  label: string;
  value?: string;
}

export const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "py-2 px-3 group text-sm border border-slate-200 rounded-full flex items-center justify-between gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}
        type="button"
      >
        <div className="truncate">{label}</div>
        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100" />
      </button>
    </>
  );
};
