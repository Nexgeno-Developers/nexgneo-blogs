"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  googleRating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .step(0.1, "Rating can have one decimal place"),
  googleReviewCount: z
    .number({ invalid_type_error: "Review count must be a number" })
    .min(0, "Review count must be at least 0")
    .int("Review count must be a whole number"),
  culthRating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .step(0.1, "Rating can have one decimal place"),
  culthReviewCount: z
    .number({ invalid_type_error: "Review count must be a number" })
    .min(0, "Review count must be at least 0")
    .int("Review count must be a whole number"),
});

interface PlatformRatingsFormProps {
  googleRating: {
    id: string;
    platform: string;
    rating: number;
    reviewCount: number;
  };
  culthRating: {
    id: string;
    platform: string;
    rating: number;
    reviewCount: number;
  };
}

export const PlatformRatingsForm: React.FC<PlatformRatingsFormProps> = ({
  googleRating,
  culthRating,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      googleRating: googleRating.rating,
      googleReviewCount: googleRating.reviewCount,
      culthRating: culthRating.rating,
      culthReviewCount: culthRating.reviewCount,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Update Google rating
      await axios.patch("/api/platform-ratings", {
        platform: "Google",
        rating: values.googleRating,
        reviewCount: values.googleReviewCount,
      });

      // Update Culth rating
      await axios.patch("/api/platform-ratings", {
        platform: "Culth",
        rating: values.culthRating,
        reviewCount: values.culthReviewCount,
      });

      toast.success("Platform ratings updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating ratings:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3">
        <Heading
          title="Platform Ratings Management"
          description="Update Google and Culth ratings and review counts"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-5">
          {/* Google Rating Section */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Google Ratings</h3>
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="googleRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min={0}
                        max={5}
                        placeholder="e.g., 4.5"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v === "" ? undefined : Number(v));
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter rating between 0.0 and 5.0 (e.g., 4.0, 4.5)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="googleReviewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Review Count</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="e.g., 150"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v === "" ? undefined : Number(v));
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of Google reviews
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Culth Rating Section */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Culth Ratings</h3>
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="culthRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Culth Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min={0}
                        max={5}
                        placeholder="e.g., 4.5"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v === "" ? undefined : Number(v));
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter rating between 0.0 and 5.0 (e.g., 4.0, 4.5)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="culthReviewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Culth Review Count</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="e.g., 100"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v === "" ? undefined : Number(v));
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of Culth reviews
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>Update Ratings</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
