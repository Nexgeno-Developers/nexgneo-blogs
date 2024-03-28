"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetSchema } from "@/schemas";
import { startTransition } from "react";
import { reset } from "@/actions/reset";
import Link from "next/link";

const ResetForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          } else if (data.error) {
            toast.error(data.error);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <>
      <div>
        <div className="w-[520px] relative py-8 px-10 shadow-2xl  rounded-3xl">
          <Image
            src="/logo.webp"
            alt="logo"
            width={200}
            height={100}
            className="object-contain"
          />
          <h1 className="font-satoshi font-semibold text-lg text-black tracking-wide mt-4">
            Forgot to password
          </h1>
          <p className="text-sm text-gray-600">to continue to Nexgeno</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4 mt-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Send Reset Email</>
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-5">
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/login">Back to login</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetForm;
