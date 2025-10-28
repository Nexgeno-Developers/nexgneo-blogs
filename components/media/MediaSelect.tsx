"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Check, ImageIcon, Search, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type MediaItem = {
  publicId: string;
  resourceType: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

type Props = {
  multiple?: boolean;
  value?: string | string[] | null;
  onChange: (value: string | string[]) => void;
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
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      setOpen(false);
    }
  };

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const signRes = await fetch("/api/media/sign-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceType: "auto" }),
      });
      const signed = await signRes.json();

      const formDatas = Array.from(files).map((file) => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", signed.apiKey);
        fd.append("timestamp", String(signed.timestamp));
        if (signed.folder) fd.append("folder", signed.folder);
        if (signed.publicId) fd.append("public_id", signed.publicId);
        fd.append("signature", signed.signature);
        return fd;
      });

      for (let i = 0; i < formDatas.length; i++) {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${signed.cloudName}/auto/upload`
          );
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const p = Math.round((e.loaded / e.total) * 100);
              setUploadProgress(p);
            }
          };
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 300) resolve();
              else reject(new Error("Upload failed"));
            }
          };
          xhr.send(formDatas[i]);
        });
      }
      
      toast.success("Uploaded successfully");
      await fetchItems(); // Refresh the list
      
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  const removeSelected = (url: string) => {
    if (multiple) {
      const next = selectedArray.filter((u) => u !== url);
      onChange(next);
    } else {
      onChange("");
    }
  };

  const selectedPreview = items.find(
    (i) => !multiple && typeof value === "string" && i.url === value
  );

  const getAcceptType = () => {
    if (resourceType === "image") return "image/*";
    if (resourceType === "video") return "video/*";
    return "image/*,video/*";
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className="justify-start flex-1"
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
                className="rounded-sm object-cover"
              />
              <span className="truncate max-w-[200px]">
                {selectedPreview.publicId}
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              {multiple ? `${selectedArray.length} selected` : "Choose media"}
            </span>
          )}
        </Button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept={getAcceptType()}
          onChange={handleFileChange}
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {uploadProgress}%
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </span>
          )}
        </Button>
      </div>

      {/* Show selected items preview for multiple selection */}
      {multiple && selectedArray.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
          {selectedArray.map((url) => {
            const item = items.find((i) => i.url === url);
            return (
              <div
                key={url}
                className="relative group border rounded-md overflow-hidden"
              >
                <Image
                  src={item?.thumbnailUrl || url}
                  alt="selected"
                  width={60}
                  height={60}
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeSelected(url)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Media</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 border rounded-md px-3 py-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media by public ID..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchItems()}
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button onClick={() => fetchItems()} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {initialLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading media...</span>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
                <p>No media found</p>
                <p className="text-sm">Upload some files to get started</p>
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
                        "relative aspect-square rounded-md overflow-hidden border-2 transition-all hover:scale-105",
                        active
                          ? "ring-2 ring-blue-500 border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <Image
                        src={it.thumbnailUrl}
                        alt={it.publicId}
                        fill
                        className="object-cover"
                      />
                      {active && (
                        <div className="absolute inset-0 bg-blue-500/20">
                          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                        {it.publicId}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {multiple
                ? `${selectedArray.length} item${
                    selectedArray.length !== 1 ? "s" : ""
                  } selected`
                : selectedPreview?.publicId || "No selection"}
            </div>
            <div className="flex gap-2">
              {nextCursor && (
                <Button
                  variant="outline"
                  onClick={() =>
                    fetchItems({ append: true, cursor: nextCursor })
                  }
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
              {multiple && (
                <Button onClick={() => setOpen(false)}>
                  Done ({selectedArray.length})
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaSelect;