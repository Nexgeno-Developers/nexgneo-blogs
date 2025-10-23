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
  logo: z.string().min(1, {
    message: "Logo is required",
  }),
  altTag: z.string().optional(),
  name: z.string().min(3, {
    message: "Client name is required",
  }),
  series: z.union([z.number().min(1), z.null()]).optional(),
});

export const AddClientForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
      altTag: "",
      name: "",
      series: null,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/clients", values);
      toast.success("Client added");
      router.push("/admin/clients");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3">
        <Heading title="Add New Client" description="Add a new client logo." />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Logo</FormLabel>
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
                    placeholder="Alt tag for logo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Client name"
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
                <>Add Client</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
