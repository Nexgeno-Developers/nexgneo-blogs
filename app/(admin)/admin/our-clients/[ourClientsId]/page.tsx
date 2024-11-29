import { db } from "@/lib/db";
import { UpdateOurClientsForm } from "./_components/update-ourClients-form";

const OurClientsIdPage = async ({
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
      <UpdateOurClientsForm data={industries} />
    </>
  );
};

export default OurClientsIdPage;
