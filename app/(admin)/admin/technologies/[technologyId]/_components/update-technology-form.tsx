"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Technology } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MediaSelect from "@/components/media/MediaSelect";

const formSchema = z.object({
  image: z.string().min(1, {
    message: "Technology icon is required",
  }),
  altTag: z.string().optional(),
  title: z.string().min(3, {
    message: "Technology name is required",
  }),
  category: z.string().optional(),
  series: z.union([z.number().min(1), z.null()]).optional(),
});

interface UpdateTechnologyFormProps {
  data: any | null;
}

export const UpdateTechnologyForm = ({ data }: UpdateTechnologyFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: data?.image || "",
      altTag: data?.altTag || "",
      title: data?.title || "",
      category: data?.category || "",
      series: data?.series ?? null,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/technologies/${data?.id}`, values);
      toast.success("Technology updated");
      router.push("/admin/technologies");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3">
        <Heading
          title="Edit Technology"
          description="Edit technology information."
        />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology Icon</FormLabel>
                <FormControl>
                  <MediaSelect
                    value={field.value}
                    onChange={field.onChange}
                    resourceType="image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alt Tag</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Alt tag for icon"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Technology name (e.g., React, Node.js)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category (optional)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Category (e.g., Frontend, Backend, Design)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="series"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order (optional)</FormLabel>
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
          <div className="mt-7 text-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>Save Changes</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
