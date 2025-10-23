import { db } from "@/lib/db";
import { UpdateResultForm } from "./_components/update-result-form";

const ResultIdPage = async ({ params }: { params: { resultId: string } }) => {
  const result = await db.result.findUnique({
    where: {
      id: params.resultId,
    },
  });
  return (
    <>
      <UpdateResultForm data={result} />
    </>
  );
};

export default ResultIdPage;
