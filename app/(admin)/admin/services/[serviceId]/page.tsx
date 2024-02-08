import { db } from "@/lib/db";
import { UpdateServiceForm } from "./_components/update-service-form";

const ServicesIdPage = async ({
  params,
}: {
  params: { serviceId: string };
}) => {
  const service = await db.services.findUnique({
    where: {
      id: params.serviceId,
    },
  });
  return (
    <>
      <UpdateServiceForm data={service} />
    </>
  );
};

export default ServicesIdPage;
