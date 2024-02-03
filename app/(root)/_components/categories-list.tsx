"use client";

import { Category } from "@prisma/client";
import { CategoryItem } from "./category-item";
import { Suspense } from "react";
import { SearchInput } from "@/components/search-input";

interface CategoriesListProps {
  items: Category[];
}

export const CategoriesList = ({ items }: CategoriesListProps) => {
  return (
    <>
      <Suspense>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
          {items.map((item) => (
            <CategoryItem key={item.id} label={item.name} value={item.id} />
          ))}
        </div>
      </Suspense>
    </>
  );
};
