"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  ShieldBan,
  ShieldCheck,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Post } from "@prisma/client";
import Link from "next/link";
import { AlertModal } from "@/components/modal/alert-modal";

interface CellActionsProps {
  data: Post;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/posts/${data.id}`);
      toast.success("Product deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onPublish = async () => {
    try {
      setLoading(true);
      if (data.isPublished) {
        await axios.patch(`/api/posts/${data.id}/unpublish`);
        toast.success("Posts UnPublished");
        router.refresh();
      } else {
        await axios.patch(`/api/posts/${data.id}/publish`);
        toast.success("Posts Published");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Post URL copied to clipboard.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
          <DropdownMenuItem>
            <Link
              className="flex items-center"
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug}`}
              target="_blank"
            >
              <Eye className="mr-2 h-4 w-4" /> View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/posts/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onPublish}>
            {data.isPublished ? (
              <>
                <ShieldBan className="mr-2 h-4 w-4" /> UnPublish
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" /> Publish
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
