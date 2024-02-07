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
        <div className="flex flex-col gap-2 pb-2 mt-5">
          {items.map((item) => (
            <CategoryItem key={item.id} label={item.name} value={item.id} />
          ))}
        </div>
      </Suspense>
    </>
  );
};
