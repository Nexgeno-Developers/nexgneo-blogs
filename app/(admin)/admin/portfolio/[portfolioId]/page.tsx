import { db } from "@/lib/db";
import { UpdatePortfolioForm } from "./_components/update-portfolio-form";

const PortfolioIdPage = async ({
  params,
}: {
  params: { portfolioId: string };
}) => {
  const portfolio = await db.portfolio.findUnique({
    where: {
      id: params.portfolioId,
    },
  });
  return (
    <>
      <UpdatePortfolioForm data={portfolio} />
    </>
  );
};

export default PortfolioIdPage;
