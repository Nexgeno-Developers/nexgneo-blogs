import { db } from "@/lib/db";
import Leads from "@/app/(admin)/admin/leads/Leads";

const LeadsPage = async () => {
  const leads = await db.leads.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <Leads initialLeads={leads} />;
};

export default LeadsPage;
