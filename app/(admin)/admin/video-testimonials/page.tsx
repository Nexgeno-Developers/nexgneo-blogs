import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";

const VideoTestimonialsPage = async () => {
  const videotestimonials = await db.videoTestimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  // just for testing whether the url is being fetched correctly
  // console.log("VIDEO TESTIMONIAL DATA:", videotestimonials);

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Video Testimonials (${videotestimonials.length})`}
          description="Manage video testimonials shown on the site"
        />
        <Link href="/admin/video-testimonials/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-5">
        <DataTable
          searchKey="name"
          placeholder="Search a testimonial by name..."
          columns={columns}
          data={videotestimonials as any}
        />
      </div>
    </>
  );
};

export default VideoTestimonialsPage;
