import { AddServicesForm } from "./_components/add-services-form";
import { getPortfolios } from "@/actions/getPortfolios";
import { getClients } from "@/actions/getClients";
import { getTechnologies } from "@/actions/getTechnologies";
import { getResults } from "@/actions/getResults";

const NewServices = async () => {
  const [portfolios, clients, technologies, results] = await Promise.all([
    getPortfolios(),
    getClients(),
    getTechnologies(),
    getResults(),
  ]);

  return (
    <AddServicesForm
      portfolios={portfolios}
      clients={clients}
      technologies={technologies}
      results={results}
    />
  );
};

export default NewServices;