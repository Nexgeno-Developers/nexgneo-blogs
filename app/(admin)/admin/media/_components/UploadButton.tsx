"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";

const UploadButton = ({ onUploaded }: { onUploaded: () => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const openPicker = () => inputRef.current?.click();

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    setProgress(0);
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
              setProgress(p);
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
      onUploaded();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*,video/*"
        onChange={(e) => e.target.files && uploadFiles(e.target.files)}
      />
      <Button onClick={openPicker} disabled={uploading}>
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {progress}%
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </>
        )}
      </Button>
    </>
  );
};

export default UploadButton;
