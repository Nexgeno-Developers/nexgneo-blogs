"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Technology } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Technology Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Icon",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <div className="relative h-12 w-12">
          <Image
            src={image}
            alt="Technology icon"
            fill
            className="object-contain rounded"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "series",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const date = format(createdAt, "MMMM do, yyyy");

      return (
        <>
          <span>{date}</span>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
