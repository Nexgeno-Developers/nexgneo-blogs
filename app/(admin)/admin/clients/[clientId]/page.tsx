import { db } from "@/lib/db";
import { UpdateClientForm } from "./_components/update-client-form";


const ClientIdPage = async ({ params }: { params: { clientId: string } }) => {
  const client = await db.client.findUnique({
    where: {
      id: params.clientId,
    },
  });
  return (
    <>
      <UpdateClientForm data={client} />
    </>
  );
};

export default ClientIdPage;
