import { db } from "@/lib/db";

export const getTestimonials = async () => {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return testimonials;
  } catch (error) {
    console.log("GET_TESTIMONIALS", error);
    return [];
  }
};