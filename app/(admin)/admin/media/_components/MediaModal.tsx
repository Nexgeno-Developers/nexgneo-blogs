"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

type Item = {
  publicId: string;
  resourceType: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

const MediaModal = ({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  item: Item;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {item.resourceType === "video" ? (
          <video controls className="w-full rounded-md" src={item.url} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.publicId}
            className="w-full rounded-md"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
