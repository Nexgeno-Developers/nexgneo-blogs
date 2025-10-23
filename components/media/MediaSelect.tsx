"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Check, ImageIcon, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaItem = {
  publicId: string;
  resourceType: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

type Props = {
  multiple?: boolean;
  value?: string | string[] | null; // stores URL(s)
  onChange: (value: string | string[]) => void; // returns URL(s)
  resourceType?: "image" | "video" | "all";
};

const MediaSelect = ({
  multiple,
  value,
  onChange,
  resourceType = "image",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [q, setQ] = useState("");
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const selectedArray = useMemo<string[]>(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const fetchItems = async (opts?: { append?: boolean; cursor?: string }) => {
    try {
      if (opts?.append) {
        setLoading(true);
      } else {
        setInitialLoading(true);
      }
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (opts?.cursor) params.set("nextCursor", opts.cursor);
      if (resourceType) params.set("resource_type", resourceType);
      const res = await fetch(`/api/media/list?${params.toString()}`);
      const data = await res.json();
      setItems((prev) =>
        opts?.append ? [...prev, ...data.items] : data.items
      );
      setNextCursor(data.nextCursor);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, resourceType]);

  const toggle = (publicId: string, url: string) => {
    if (multiple) {
      const exists = selectedArray.includes(url);
      const next = exists
        ? selectedArray.filter((u) => u !== url)
        : [...selectedArray, url];
      onChange(next);
    } else {
      onChange(url);
    }
  };

  const selectedPreview = items.find(
    (i) => !multiple && typeof value === "string" && i.url === value
  );

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="justify-start"
        disabled={initialLoading}
      >
        {initialLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading media...
          </span>
        ) : !multiple &&
          typeof value === "string" &&
          value &&
          selectedPreview ? (
          <span className="flex items-center gap-2">
            <Image
              src={selectedPreview.thumbnailUrl}
              alt="selected"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span className="truncate max-w-[200px]">{value}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            {multiple ? `${selectedArray.length} selected` : "Choose media"}
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-full max-w-md">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search media"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button onClick={() => fetchItems()} disabled={loading}>
              Search
            </Button>
          </div>

          {initialLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading media...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {items.map((it) => {
                const active = selectedArray.includes(it.url);
                return (
                  <button
                    key={it.publicId}
                    type="button"
                    onClick={() => toggle(it.publicId, it.url)}
                    className={cn(
                      "relative aspect-square rounded-md overflow-hidden border",
                      active && "ring-2 ring-sky-500"
                    )}
                  >
                    <Image
                      src={it.thumbnailUrl}
                      alt={it.publicId}
                      fill
                      className="object-cover"
                    />
                    {active && (
                      <div className="absolute top-1 right-1 bg-sky-500 text-white rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              {selectedPreview?.publicId ||
                selectedArray
                  .map((url) => {
                    const item = items.find((i) => i.url === url);
                    return item?.publicId;
                  })
                  .join(", ")}
            </div>
            {nextCursor && (
              <Button
                onClick={() => fetchItems({ append: true, cursor: nextCursor })}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaSelect;
