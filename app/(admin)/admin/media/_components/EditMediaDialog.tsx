"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

type Item = {
  publicId: string;
  resourceType: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

const EditMediaDialog = ({
  open,
  onOpenChange,
  item,
  onUpdated,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  item: Item;
  onUpdated: () => void;
}) => {
  const [publicId, setPublicId] = useState(item.publicId);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      if (publicId && publicId !== item.publicId) {
        await fetch("/api/media/rename", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromPublicId: item.publicId,
            toPublicId: publicId,
            resourceType: item.resourceType,
          }),
        });
        toast.success("Renamed");
      }
      onUpdated();
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Public ID</label>
            <Input
              value={publicId}
              onChange={(e) => setPublicId(e.target.value)}
            />
          </div>
          <div className="text-end">
            <Button onClick={onSave} disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMediaDialog;
