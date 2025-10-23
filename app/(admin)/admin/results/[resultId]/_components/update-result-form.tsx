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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
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
  icon: z.string().min(1, {
    message: "Icon is required",
  }),
  iconAltTag: z.string().optional(),
  title: z.string().min(3, {
    message: "Title is required",
  }),
  desc: z.string().min(3, {
    message: "Description is required",
  }),
  image: z.string().min(1, {
    message: "Main image is required",
  }),
  imageAltTag: z.string().optional(),
  buttonText: z.string().min(1, {
    message: "Button text is required",
  }),
  slug: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  series: z.union([z.number().min(1), z.null()]).optional(),
  showOnHome: z.boolean().default(false),
});

interface UpdateResultFormProps {
  data: any | null;
}

export const UpdateResultForm = ({ data }: UpdateResultFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: data?.icon || "",
      iconAltTag: data?.iconAltTag || "",
      title: data?.title || "",
      desc: data?.desc || "",
      image: data?.image || "",
      imageAltTag: data?.imageAltTag || "",
      buttonText: data?.buttonText || "View Our Work",
      slug: data?.slug || "",
      metaTitle: data?.metaTitle || "",
      metaDesc: data?.metaDesc || "",
      series: data?.series ?? null,
      showOnHome: data?.showOnHome ?? false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/results/${data?.id}`, values);
      toast.success("Result updated");
      router.push("/admin/results");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3">
        <Heading title="Edit Result" description="Edit result information." />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
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
            name="iconAltTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Alt Tag</FormLabel>
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g., 500+"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Description text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
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
            name="imageAltTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Alt Tag</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Alt tag for main image"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g., View Our Work"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (optional)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="URL slug (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title (optional)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="SEO meta title (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="SEO meta description (optional)"
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
          <FormField
            control={form.control}
            name="showOnHome"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Show on Homepage</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
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
