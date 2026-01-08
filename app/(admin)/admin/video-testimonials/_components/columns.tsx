// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { format } from "date-fns";
// import CellActions from "./cell-actions";
// import { VideoPreview } from "./video-preview";
// import { getYoutubeVideoId } from "@/lib/youtube";
// import { VideoTestimonial } from "@prisma/client"


// export const columns: ColumnDef<VideoTestimonial>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "videoUrl",
//     header: "Video Preview",
//    cell: ({ row }) => {
//     const videoUrl = row.original.videoUrl;
//     const videoId = getYoutubeVideoId(videoUrl);

//     if (!videoId) {
//       return <span className="text-muted-foreground">—</span>;
//     }

//     const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

//     return (
//       <a
//         href={videoUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-2"
//       >
//         <Image
//           src={thumbnailUrl}
//           alt="YouTube thumbnail"
//           width={120}
//           height={68}
//           className="rounded-md border"
//         />
//       </a>
//     );
//   },
// },
// ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellActions from "./cell-actions";
import { getYoutubeVideoId } from "@/lib/youtube";

type VideoTestimonialRow = {
  id: string;
  name: string;
  videoUrl: string;
  role: string;
  company: string;
  order: number;
  createdAt: Date;
};

export const columns: ColumnDef<VideoTestimonialRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "videoUrl",
  //   header: "Video Preview",
  //   cell: ({ row }) => {
  //     const videoUrl = row.original.videoUrl;
  //     const videoId = getYoutubeVideoId(videoUrl);

  //     if (!videoId) {
  //       return <span className="text-muted-foreground">—</span>;
  //     }
  //     const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
  //     return (
  //       <a href={videoUrl} target="_blank" rel="noopener noreferrer">
  //         <Image
  //           src={thumbnailUrl}
  //           alt="YouTube thumbnail"
  //           width={120}
  //           height={68}
  //           className="rounded-md border"
  //         />
  //       </a>
  //     );
  //   },
  // },

  {
  accessorKey: "videoUrl",
  header: "Video Preview",
  cell: ({ row }) => {
    const videoUrl = row.original.videoUrl;

    console.log("ROW VIDEO URL:", videoUrl); // 👈 ADD THIS

    const videoId = getYoutubeVideoId(videoUrl);

    if (!videoId) {
      return <span>—</span>;
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnailUrl}
          width={120}
          height={68}
          style={{ borderRadius: 6 }}
        />
      </a>
    );
  },
},

  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];


