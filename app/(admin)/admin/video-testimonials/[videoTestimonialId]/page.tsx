import { db } from "@/lib/db";
import { UpdateVideoTestimonialForm } from "./_components/update-video-testimonial-form";

const VideoTestimonialIdPage = async ({
  params,
}: {
  params: { videoTestimonialId: string };
}) => {
  const testimonial = await db.videoTestimonial.findUnique({
    where: { id: params.videoTestimonialId },
  });

  return (
    <>
      <UpdateVideoTestimonialForm data={testimonial as any} />
    </>
  );
};

export default VideoTestimonialIdPage;
