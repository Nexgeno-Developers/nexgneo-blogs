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
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Services } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface UpdateServiceFormProps {
  data: Services | null;
}

const formSchema = z.object({
  image: z.string().min(1, {
    message: "Image is required",
  }),
  title: z.string().min(3, {
    message: "Title is Required minimum 3 char",
  }),
  desc: z.string().min(3, {
    message: "Desc is Required minimum 3 char",
  }),
  slug: z
    .string()
    .min(3, {
      message: "Slug is required",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Invalid slug format. Slugs can only contain lowercase letters, numbers, and hyphens.",
    }),
  metaTitle: z.string().min(3, {
    message: "metaTitle is required",
  }),
  metaDesc: z.string().min(3, {
    message: "metaTitle is required",
  }),
<<<<<<< HEAD
  content: z.string().min(3, {
    message: "h1Title is required",
  }),
=======
  h1Title: z.string().min(3, {
    message: "h1Title is required",
  }),
  h1Desc: z.string().min(3, {
    message: "h1Desc is required",
  }),
  h2Title: z.string().min(3, {
    message: "h2Title is required",
  }),
  h2Desc: z.string().min(3, {
    message: "h2Desc is required",
  }),
>>>>>>> 3dc6dfed4b04963d3da9876e36a12ce8a612c263
});

export const UpdateServiceForm = ({ data }: UpdateServiceFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: data?.image || "",
      title: data?.title || "",
      desc: data?.desc || "",
      slug: data?.slug || "",
      metaTitle: data?.metaTitle || "",
      metaDesc: data?.metaDesc || "",
<<<<<<< HEAD
      content: data?.content || "",
=======
      h1Title: data?.h1Title || "",
      h1Desc: data?.h1Desc || "",
      h2Title: data?.h2Title || "",
      h2Desc: data?.h2Desc || "",
>>>>>>> 3dc6dfed4b04963d3da9876e36a12ce8a612c263
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/services/${data?.id}`, values);
      toast.success("Services updated");
      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl">Update Services</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mt-5"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isSubmitting}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
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
                      placeholder="Title"
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
                      placeholder="Description"
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'https://nexgneo.in/web-application'"
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
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Meta Title"
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
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Meta Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<<<<<<< HEAD

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
=======
            <FormField
              control={form.control}
              name="h1Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>H1 Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="H1 Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="h1Desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>H1 Description</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="h2Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>H2 Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="H2 Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="h2Desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>H2 Description</FormLabel>
>>>>>>> 3dc6dfed4b04963d3da9876e36a12ce8a612c263
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-end">
              <Button type="submit" className="mt-2" disabled={isSubmitting}>
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
      </div>
    </>
  );
};
