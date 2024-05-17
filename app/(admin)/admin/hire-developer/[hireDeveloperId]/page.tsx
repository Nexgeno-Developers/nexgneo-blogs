import { db } from "@/lib/db";
import { UpdateHireDeveloperForm } from "./_components/update-hire-developer-form";

const HireDeveloperIdPage = async ({
  params,
}: {
  params: { hireDeveloperId: string };
}) => {
  const hireDeveloper = await db.hireDeveloper.findUnique({
    where: {
      id: params.hireDeveloperId,
    },
  });
  return (
    <>
      <UpdateHireDeveloperForm data={hireDeveloper} />
    </>
  );
};

export default HireDeveloperIdPage;
