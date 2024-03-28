"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import { Heading } from "@/components/ui/heading";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Category Name is required",
  }),
});

interface UpdateCategoryFormProps {
  initialData: Category | null;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/category/${params.categoryId}`, values);
      toast.success("Category Updated");
      router.push(`/admin/categories`);
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3">
        <Heading title="Edit Category" description="Edit a Category." />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Category Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-7 text-end">
            <Button type="submit" disabled={!isValid || isSubmitting}>
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

export default UpdateCategoryForm;
