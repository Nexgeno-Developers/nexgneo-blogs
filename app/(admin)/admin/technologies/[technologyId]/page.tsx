import { db } from "@/lib/db";
import { UpdateTechnologyForm } from "./_components/update-technology-form";

const TechnologyIdPage = async ({
  params,
}: {
  params: { technologyId: string };
}) => {
  const technology = await db.technology.findUnique({
    where: {
      id: params.technologyId,
    },
  });
  return (
    <>
      <UpdateTechnologyForm data={technology} />
    </>
  );
};

export default TechnologyIdPage;
