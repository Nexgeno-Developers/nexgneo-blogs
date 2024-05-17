import { db } from "@/lib/db";
import { UpdateIndustriesForm } from "./_components/update-industries-form";

const IndustriesIdPage = async ({
  params,
}: {
  params: { industriesId: string };
}) => {
  const industries = await db.industries.findUnique({
    where: {
      id: params.industriesId,
    },
  });
  return (
    <>
      <UpdateIndustriesForm data={industries} />
    </>
  );
};

export default IndustriesIdPage;
