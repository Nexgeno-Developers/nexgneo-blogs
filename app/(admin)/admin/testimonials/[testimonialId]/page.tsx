import { db } from "@/lib/db";
import { UpdateTestimonialForm } from "./_components/update-testimonial-form";

const TestimonialIdPage = async ({
  params,
}: {
  params: { testimonialId: string };
}) => {
  const testimonial = await db.testimonial.findUnique({
    where: { id: params.testimonialId },
  });
  return (
    <>
      <UpdateTestimonialForm data={testimonial as any} />
    </>
  );
};

export default TestimonialIdPage;
