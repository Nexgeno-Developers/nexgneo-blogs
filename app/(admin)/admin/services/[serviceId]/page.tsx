import { db } from "@/lib/db";
import { UpdateServiceForm } from "./_components/update-service-form";
import { getPortfolios } from "@/actions/getPortfolios";
import { getClients } from "@/actions/getClients";
import { getTechnologies } from "@/actions/getTechnologies";
import { getResults } from "@/actions/getResults";

const ServicesIdPage = async ({
  params,
}: {
  params: { serviceId: string };
}) => {
  const service = await db.services.findUnique({
    where: { id: params.serviceId },
  });

  const [portfolios, clients, technologies, results] = await Promise.all([
    getPortfolios(),
    getClients(),
    getTechnologies(),
    getResults(),
  ]);

  return (
    <UpdateServiceForm
      data={service}
      portfolios={portfolios}
      clients={clients}
      technologies={technologies}
      results={results}
    />
  );
};

export default ServicesIdPage;