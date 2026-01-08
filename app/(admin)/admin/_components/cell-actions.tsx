"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ScheduleModal from "./ScheduleModel";
import { CheckIcon, Copy, Eye, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface CellActionsProps {
  data: Post;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const [openSchedule, setOpenSchedule] = useState(false);
  
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Post URL copied to clipboard.");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              onCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug}`)
            }
          >
            <Copy className="mr-2 h-4 w-4" /> Copy URL
          </DropdownMenuItem>
           <DropdownMenuItem
            onClick={() => setOpenSchedule(true)
            }
          >
            <CheckIcon className="mr-2 h-4 w-4" /> Schedule Task
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center"
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug}`}
              target="_blank"
            >
              <Eye className="mr-2 h-4 w-4" /> View
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

       {/* Schedule Modal  */} {/* added this model */}
      <ScheduleModal
        open={openSchedule}
        onClose={() => setOpenSchedule(false)}
        postId={data.id}
      />
    </>
  );
};

export default CellActions;
