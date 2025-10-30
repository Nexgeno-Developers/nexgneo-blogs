import { AddServicesForm } from "./_components/add-services-form";
import { getPortfolios } from "@/actions/getPortfolios";
import { getClients } from "@/actions/getClients";
import { getTechnologies } from "@/actions/getTechnologies";
import { getResults } from "@/actions/getResults";
import { db } from "@/lib/db";
import { getTestimonials } from "@/actions/getTestimonials";

const NewServices = async () => {
  const [portfolios, clients, technologies, results, testimonials] =
    await Promise.all([
      getPortfolios(),
      getClients(),
      getTechnologies(),
      getResults(),
      getTestimonials()
    ]);

  return (
    <AddServicesForm
      portfolios={portfolios}
      clients={clients}
      technologies={technologies}
      results={results}
      testimonials={testimonials as any}
    />
  );
};

export default NewServices;
