import { UpdateServiceForm } from "./_components/update-service-form";
import { getPortfolios } from "@/actions/getPortfolios";
import { getClients } from "@/actions/getClients";
import { getTechnologies } from "@/actions/getTechnologies";
import { getResults } from "@/actions/getResults";
import { getTestimonials } from "@/actions/getTestimonials";
import { db } from "@/lib/db";

const ServicesIdPage = async ({
  params,
}: {
  params: { serviceId: string };
}) => {
  const service = await db.services.findUnique({
    where: { id: params.serviceId },
  });

  const [portfolios, clients, technologies, results, testimonials] =
    await Promise.all([
      getPortfolios(),
      getClients(),
      getTechnologies(),
      getResults(),
      getTestimonials()
    ]);

  return (
    <UpdateServiceForm
      data={service}
      portfolios={portfolios}
      clients={clients}
      technologies={technologies}
      results={results}
      testimonials={testimonials as any}
    />
  );
};

export default ServicesIdPage;
