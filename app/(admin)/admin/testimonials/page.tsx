import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";

const TestimonialsPage = async () => {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Testimonials (${testimonials.length})`}
          description="Manage testimonials shown in the site"
        />
        <Link href="/admin/testimonials/new">
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
          data={testimonials as any}
        />
      </div>
    </>
  );
};

export default TestimonialsPage;
