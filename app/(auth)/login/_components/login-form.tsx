"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
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
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { startTransition } from "react";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
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
            Sign in
          </h1>
          <p className="text-sm text-gray-600">to continue to Nexgeno</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 mt-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Password"
                        type="password"
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
                    <>Submit</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
