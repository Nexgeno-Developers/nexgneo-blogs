"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import ImageUpload from "@/components/ui/image-upload";
import MediaSelect from "@/components/media/MediaSelect";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Portfolio } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface UpdatePortfolioFormProps {
  data: Portfolio | null;
}

// Validation Schema
const formSchema = z.object({
  image: z.string().min(1, { message: "At least one image is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  title: z.string().min(3, { message: "Title is required (min 3 chars)" }),
  slug: z.string().optional(),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }), // Fixed tags type
  technology: z
    .array(z.string())
    .min(1, { message: "At least one technology is required" }),
  series: z.union([z.number().min(1), z.null()]).optional(),
  showInCaseStudy: z.boolean().default(false), // New field for Case Study
});

export const UpdatePortfolioForm = ({ data }: UpdatePortfolioFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: data?.image || "",
      title: data?.title || "",
      category: data?.category || "",
      slug: data?.slug || "",
      technology: data?.technology || [],
      tags: data?.tags || [], // Fixed type consistency
      series: data?.series ?? null,
      showInCaseStudy: data?.showInCaseStudy ?? false, // Default to false
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/portfolio/${data?.id}`, values);
      toast.success("Portfolio page updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while updating the portfolio.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold">Update Portfolio Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          {/* Image Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <MediaSelect
                    multiple={false}
                    value={field.value || null}
                    onChange={(url) => field.onChange(url)}
                    resourceType="image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter a title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug Field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g., web-application"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter category"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Technology Field */}
          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter technologies (comma-separated)"
                    value={field.value.join(", ")}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((tech) => tech.trim())
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Tags Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter tags (comma-separated)"
                    value={field.value.join(", ")}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(",")
                          .map((tag) => tag.trim().toLowerCase()) // Convert to lowercase
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Series Field */}
          <FormField
            control={form.control}
            name="series"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Series (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter order number (optional)"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? null : Number(e.target.value);
                      field.onChange(value);
                    }}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showInCaseStudy"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={isSubmitting}
                    className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 pt-0 relative top-[2px] right-[5px]"
                  />
                </FormControl>
                <FormLabel>Show in Case Study</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <div className="text-end">
            <Button type="submit" className="mt-4" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
