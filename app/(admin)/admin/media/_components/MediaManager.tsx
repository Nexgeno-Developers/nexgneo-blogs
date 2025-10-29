// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Heading } from "@/components/ui/heading";
// import { Loader2, Search } from "lucide-react";
// import MediaCard from "./MediaCard";
// import UploadButton from "./UploadButton";

// type Item = {
//   publicId: string;
//   resourceType: string;
//   url: string;
//   thumbnailUrl: string;
//   createdAt: string;
// };

// const MediaManager = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [q, setQ] = useState("");
//   const [type, setType] = useState<"all" | "image" | "video">("all");
//   const [nextCursor, setNextCursor] = useState<string | undefined>();

//   const fetchItems = async (opts?: { append?: boolean; cursor?: string }) => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (q) params.set("q", q);
//       if (opts?.cursor) params.set("nextCursor", opts.cursor);
//       if (type) params.set("resource_type", type);
//       const res = await fetch(`/api/media/list?${params.toString()}`);
//       const data = await res.json();
//       setItems((prev) =>
//         opts?.append ? [...prev, ...data.items] : data.items
//       );
//       setNextCursor(data.nextCursor);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [type]);

//   const onSearch = () => fetchItems();
//   const onClear = () => {
//     setQ("");
//     fetchItems();
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between pb-4">
//         <Heading
//           title="Media"
//           description="Manage all media assets from Cloudinary"
//         />
//         <UploadButton onUploaded={() => fetchItems()} />
//       </div>
//       <Separator />
//       <div className="mt-5 flex gap-3 items-center">
//         <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-full max-w-md">
//           <Search className="h-4 w-4" />
//           <Input
//             placeholder="Search media (public_id, etc.)"
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             className="border-0 shadow-none focus-visible:ring-0"
//           />
//         </div>
//         <select
//           className="border rounded-md px-3 py-2"
//           value={type}
//           onChange={(e) => setType(e.target.value as any)}
//         >
//           <option value="all">All</option>
//           <option value="image">Images</option>
//           <option value="video">Videos</option>
//         </select>
//         <Button onClick={onSearch} disabled={loading}>
//           Search
//         </Button>
//         {q && (
//           <Button variant="secondary" onClick={onClear} disabled={loading}>
//             Clear
//           </Button>
//         )}
//       </div>

//       <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {items?.map((it) => (
//           <MediaCard
//             key={it.publicId}
//             item={it}
//             onChange={() => fetchItems()}
//           />
//         ))}
//       </div>

//       <div className="flex justify-center py-6">
//         {loading ? (
//           <Loader2 className="h-5 w-5 animate-spin" />
//         ) : nextCursor ? (
//           <Button
//             onClick={() => fetchItems({ append: true, cursor: nextCursor })}
//           >
//             Load More
//           </Button>
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default MediaManager;
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Loader2, Search, AlertCircle } from "lucide-react";
import MediaCard from "./MediaCard";
import UploadButton from "./UploadButton";

type Item = {
  publicId: string;
  resourceType: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

const MediaManager = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "image" | "video">("all");
  const [nextCursor, setNextCursor] = useState<string | undefined>();

  const fetchItems = async (opts?: { append?: boolean; cursor?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (opts?.cursor) params.set("nextCursor", opts.cursor);
      if (type) params.set("resource_type", type);
      
      const res = await fetch(`/api/media/list?${params.toString()}`);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }
      
      const data = await res.json();
      setItems((prev) =>
        opts?.append ? [...prev, ...data.items] : data.items
      );
      setNextCursor(data.nextCursor);
    } catch (err) {
      console.error("Failed to fetch media:", err);
      setError(err instanceof Error ? err.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const onSearch = () => fetchItems();
  const onClear = () => {
    setQ("");
    fetchItems();
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title="Media"
          description="Manage all media assets from Cloudinary"
        />
        <UploadButton onUploaded={() => fetchItems()} />
      </div>
      <Separator />
      
      <div className="mt-5 flex gap-3 items-center flex-wrap">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-full max-w-md">
          <Search className="h-4 w-4" />
          <Input
            placeholder="Search media (public_id, etc.)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <select
          className="border rounded-md px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
        <Button onClick={onSearch} disabled={loading}>
          Search
        </Button>
        {q && (
          <Button variant="secondary" onClick={onClear} disabled={loading}>
            Clear
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-800">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {console.log("Items" , items)}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <MediaCard
            key={it.publicId}
            item={it}
            onChange={() => fetchItems()}
          />
        ))}
      </div>

      {!loading && items.length === 0 && !error && (
        <div className="text-center py-12 text-muted-foreground">
          No media found. Upload some files to get started!
        </div>
      )}

      <div className="flex justify-center py-6">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : nextCursor ? (
          <Button
            onClick={() => fetchItems({ append: true, cursor: nextCursor })}
          >
            Load More
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default MediaManager;