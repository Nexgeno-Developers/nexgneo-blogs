import { db } from "@/lib/db";
import { UpdateSolutionForm } from "./_components/update-solution-form";

const SolutionIdPage = async ({
  params,
}: {
  params: { solutionId: string };
}) => {
  const solution = await db.solutions.findUnique({
    where: {
      id: params.solutionId,
    },
  });
  return (
    <>
      <UpdateSolutionForm data={solution} />
    </>
  );
};

export default SolutionIdPage;
