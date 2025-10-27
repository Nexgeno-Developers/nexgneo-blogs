"use client";
import { TinyEditor } from "@/components/tynimceditor";
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
import { Switch } from "@/components/ui/switch"; // Import Switch
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Services, Portfolio } from "@prisma/client";
import axios from "axios";
import { Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import MediaSelect from "@/components/media/MediaSelect";

interface UpdateServiceFormProps {
  data: Services | null;
  portfolios: Portfolio[];
  clients: any[];
  technologies: any[];
  results: any[];
  whyChooseItems?: any;
  processItems?: any;
}
const cardSchema = z.object({
  image: z.string().min(1, "Image is required"),
  title: z.string().min(2, "Title is required"),
  desc: z.string().min(3, "Description is required"),
});

const faqSchema = z.object({
  title: z.string().min(2, "Title is required"),
  desc: z.string().min(3, "Description is required"),
});
const formSchema = z.object({
  image: z.string().min(1, {
    message: "Image is required",
  }),
  altTag: z.string().min(1, {
    message: "AltTag is required",
  }),
  title: z.string().min(3, {
    message: "Title is Required minimum 3 char",
  }),
  menuTitle: z.string().optional(),
  desc: z.string().min(3, {
    message: "Desc is Required minimum 3 char",
  }),
  HeroButton: z.string().optional(),
  CTAname: z.string().optional(),
  CTAbuttonname: z.string().optional(),
  Seoimag1: z.string().optional(),
  Seocontent1: z.string().optional(),
  Seoimag2: z.string().optional(),
  Seocontent2: z.string().optional(),
  schema: z.string().optional(),
  // Why Choose
  whyChoose: z.string().min(3, { message: "whyChoose is required" }),
  whyChooseItems: z
    .array(cardSchema)
    .min(1, "Add at least one Why Choose card"),
  faqItems: z.array(faqSchema).min(1, "Add at least one FAQ"),

  // OUR PROCESS (only items)
  processItems: z.array(cardSchema).min(1, "Add at least one process step"),
  slug: z
    .string()
    .min(3, {
      message: "Slug is required",
    })
    .regex(/^[a-z0-9]+(?:[-.][a-z0-9]+)*$/, {
      message:
        "Invalid slug format. Slugs can only contain lowercase letters, numbers, hyphens, and periods.",
    }),
  metaTitle: z.string().min(3, {
    message: "metaTitle is required",
  }),
  metaDesc: z.string().min(3, {
    message: "metaTitle is required",
  }),
  content: z.string().min(3, {
    message: "h1Title is required",
  }),
  whyChoose: z.string().min(3, {
    message: "whyChoose is required",
  }),
  portfolioIds: z.array(z.string()).optional().default([]),
  clientIds: z.array(z.string()).optional().default([]),
  technologyIds: z.array(z.string()).optional().default([]),
  resultIds: z.array(z.string()).optional().default([]),
  series: z.union([z.number().min(1), z.null()]).optional(),
  showInMenu: z.boolean().default(false),
});

export const UpdateServiceForm = ({
  data,
  portfolios,
  clients,
  technologies,
  results,
}: UpdateServiceFormProps) => {
  const router = useRouter();
  // Parse existing Why Choose items (support legacy JSON-in-string if needed)
  const parsedWhyChooseItems: { image: string; title: string; desc: string }[] =
    (() => {
      if (Array.isArray((data as any)?.whyChooseItems))
        return (data as any).whyChooseItems;
      try {
        const maybe = JSON.parse((data as any)?.whyChoose ?? "[]");
        if (Array.isArray(maybe)) return maybe;
      } catch {}
      return [];
    })();

  // Parse existing Process items
  const parsedProcessItems: { image: string; title: string; desc: string }[] =
    (() => {
      if (Array.isArray((data as any)?.processItems))
        return (data as any).processItems;
      return [];
    })();

  const parsedFaqItems: { title: string; desc: string }[] = Array.isArray(
    (data as any)?.faqItems
  )
    ? (data as any).faqItems
    : [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: data?.image || "",
      altTag: data?.altTag || "",
      title: data?.title || "",
      menuTitle: data?.menuTitle || "",
      HeroButton: data?.HeroButton || "",
      CTAname: data?.CTAname || "",
      CTAbuttonname: data?.CTAbuttonname || "",
      Seoimag1: data?.Seoimag1 || "",
      Seocontent1: data?.Seocontent1 || "",
      Seoimag2: data?.Seoimag2 || "",
      Seocontent2: data?.Seocontent2 || "",
      desc: data?.desc || "",
      schema: data?.schema ?? undefined,
      slug: data?.slug || "",
      metaTitle: data?.metaTitle || "",
      metaDesc: data?.metaDesc || "",
      content: data?.content || "",
      series: data?.series ?? null,
      portfolioIds: (data as any)?.portfolioIds || [],
      clientIds: (data as any)?.clientIds || [],
      technologyIds: (data as any)?.technologyIds || [],
      resultIds: (data as any)?.resultIds || [],
      // Why Choose
      whyChoose:
        data?.whyChoose &&
        typeof data.whyChoose === "string" &&
        !data.whyChoose.startsWith("[")
          ? data.whyChoose
          : "Why Choose Nexgeno?",
      whyChooseItems:
        parsedWhyChooseItems.length > 0
          ? parsedWhyChooseItems
          : [{ image: "", title: "", desc: "" }],

      // OUR PROCESS (only items)
      processItems:
        parsedProcessItems.length > 0
          ? parsedProcessItems
          : [{ image: "", numbers: "", title: "", desc: "" }],

      faqItems: parsedFaqItems.length
        ? parsedFaqItems
        : [{ title: "", desc: "" }],
      showInMenu: data?.showInMenu ?? false, // Set default to false
    },
  });

  const { isSubmitting } = form.formState;
  const items = useFieldArray({
    control: form.control,
    name: "whyChooseItems",
  });
  const procArray = useFieldArray({
    control: form.control,
    name: "processItems",
  });
  const faqArray = useFieldArray({ control: form.control, name: "faqItems" });
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
      <div className="mt-10">
        <h1 className="text-2xl">Update Services</h1>
        <div className="shadow-md p-8 space-y-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 mt-5"
            >
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Hero Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="grid gap-2">
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
                      name="HeroButton"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hero Button Text</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="e.g. Get Started"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hero Image</FormLabel>
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
                      name="altTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alt Tag</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Alt Tag"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">SEO Settings</h2>

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. web-application"
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
              </section>

              <hr />
              <FormField
                control={form.control}
                name="whyChoose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why Choose Content</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <section className="shadow-md p-8 pt-5 space-y-8">
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-lg font-semibold">Why Choose</h3>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      items.append({ image: "", title: "", desc: "" })
                    }
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add Why Choose
                  </Button>
                </div>

                <div className="grid gap-6">
                  {items.fields.map((field, index) => (
                    <div key={field.id} className="border">
                      <div className="flex flex-row items-center justify-between p-4">
                        <div className="text-base font-semibold">
                          Why Choose Box #{index + 1}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => items.remove(index)}
                          disabled={isSubmitting || items.fields.length === 1}
                          title={
                            items.fields.length === 1
                              ? "At least one card required"
                              : "Remove this card"
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex gap-10 p-6">
                        <div className="w-[20%]">
                          <FormField
                            control={form.control}
                            name={`whyChooseItems.${index}.image`}
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
                        </div>

                        <div className="w-[80%] grid">
                          <FormField
                            control={form.control}
                            name={`whyChooseItems.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. Built for relevance"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`whyChooseItems.${index}.desc`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    disabled={isSubmitting}
                                    placeholder="Short description"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ================= OUR PROCESS (items only) ================= */}
              <section className="shadow-md p-8 pt-5 space-y-8">
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-lg font-semibold">Our Process</h3>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      procArray.append({ image: "", title: "", desc: "" })
                    }
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add Step
                  </Button>
                </div>

                <div className="grid gap-6">
                  {procArray.fields.map((field, index) => (
                    <div key={field.id} className="border">
                      <div className="flex flex-row items-center justify-between p-4">
                        <div className="text-base font-semibold">
                          Step #{index + 1}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => procArray.remove(index)}
                          disabled={
                            isSubmitting || procArray.fields.length === 1
                          }
                          title={
                            procArray.fields.length === 1
                              ? "At least one step required"
                              : "Remove"
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex gap-10 p-6">
                        <div className="w-[20%]">
                          <FormField
                            control={form.control}
                            name={`processItems.${index}.image`}
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
                        </div>

                        <div className="w-[80%] grid">
                          <FormField
                            control={form.control}
                            name={`processItems.${index}.numbers`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Step Number</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. Discovery"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`processItems.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. Discovery"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`processItems.${index}.desc`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    disabled={isSubmitting}
                                    placeholder="Short description"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="shadow-md p-8 pt-5 space-y-8">
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-lg font-semibold">FAQ</h3>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => faqArray.append({ title: "", desc: "" })}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add FAQ
                  </Button>
                </div>

                <div className="grid gap-6">
                  {faqArray.fields.map((field, index) => (
                    <div key={field.id} className="border">
                      <div className="flex flex-row items-center justify-between p-4">
                        <div className="text-base font-semibold">
                          FAQ #{index + 1}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => faqArray.remove(index)}
                          disabled={
                            isSubmitting || faqArray.fields.length === 1
                          }
                          title={
                            faqArray.fields.length === 1
                              ? "At least one FAQ required"
                              : "Remove"
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-6 p-6">
                        <FormField
                          control={form.control}
                          name={`faqItems.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder="e.g. What services do you offer?"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`faqItems.${index}.desc`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  disabled={isSubmitting}
                                  placeholder="Answer..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="shadow-md p-8 pt-5 space-y-8">
                <div className="grid grid-cols-2 gap-6 mt-2">
                  <FormField
                    control={form.control}
                    name="CTAname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTA Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="e.g. Get Started"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CTAbuttonname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTA Button Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="e.g. Get Started"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="shadow-md p-8 pt-5 space-y-8">
                <div className="grid grid-cols-2 gap-6 mt-2">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="Seoimag1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Image 1</FormLabel>
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
                      name="Seocontent1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Content 1</FormLabel>
                          <FormControl>
                            <TinyEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="Seoimag2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Image 2</FormLabel>
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
                      name="Seocontent2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Content 2</FormLabel>
                          <FormControl>
                            <TinyEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </section>

              <FormField
                control={form.control}
                name="portfolioIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Portfolios</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={portfolios.map((p) => ({
                          value: p.id,
                          label: p.title,
                          category: p.category,
                          image: p.image || undefined,
                        }))}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Search and select portfolios..."
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Our Clients Multi-Select */}
              <FormField
                control={form.control}
                name="clientIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Clients</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={clients.map((c) => ({
                          value: c.id,
                          label: c.name,
                          image: c.logo || undefined,
                        }))}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select clients..."
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Our Technologies Multi-Select */}
              <FormField
                control={form.control}
                name="technologyIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Technologies</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={technologies.map((t) => ({
                          value: t.id,
                          label: t.title,
                          image: t.image || undefined,
                        }))}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select technologies..."
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Our Results Multi-Select */}
              <FormField
                control={form.control}
                name="resultIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related Results</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={results.map((r) => ({
                          value: r.id,
                          label: r.title,
                          image: r.icon || undefined,
                        }))}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select results..."
                        disabled={isSubmitting}
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
                            e.target.value === ""
                              ? null
                              : Number(e.target.value);
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
                name="schema"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schema Tag</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Description"
                        className="h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Checkbox Field for Show in Menu */}
              <FormField
                control={form.control}
                name="showInMenu"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormLabel>Show in Menu</FormLabel>
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
      </div>
    </>
  );
};
