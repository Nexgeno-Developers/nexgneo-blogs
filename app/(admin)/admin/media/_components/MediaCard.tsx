"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import MediaModal from "./MediaModal";
import EditMediaDialog from "./EditMediaDialog";
import { AlertModal } from "@/components/modal/alert-modal";
import toast from "react-hot-toast";

type Item = {
  publicId: string;
  resourceType: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

const MediaCard = ({
  item,
  onChange,
}: {
  item: Item;
  onChange: () => void;
}) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicId: item.publicId,
          resourceType: item.resourceType,
        }),
      });
      toast.success("Media deleted");
      onChange();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <MediaModal open={viewOpen} onOpenChange={setViewOpen} item={item} />
      <EditMediaDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        item={item}
        onUpdated={onChange}
      />
      <div className="border rounded-md overflow-hidden">
        <div className="relative aspect-video bg-gray-50">
          <Image
            src={item.thumbnailUrl}
            alt={item.publicId}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3 text-sm">
          <div className="truncate" title={item.publicId}>
            {item.publicId}
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setViewOpen(true)}
            >
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaCard;
