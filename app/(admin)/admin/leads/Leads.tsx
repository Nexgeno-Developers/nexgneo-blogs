"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import saveAs from "file-saver";
import { columns } from "./_components/columns";

type Lead = {
  id: string;
  name: string;
  last: string | null;
  email: string;
  mobile: string;
  subject: string;
  company_name: string | null;
  interested_service: string | null;
  project_budget: string | null;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

interface LeadsProps {
  initialLeads: Lead[];
}

const Leads: React.FC<LeadsProps> = ({ initialLeads }) => {
  const handleExport = () => {
    const csvContent =
      "Name,Email,Mobile Number,Date\n" +
      initialLeads
        .map((lead: Lead) => [
          lead.name,
          lead.email,
          lead.mobile,
          new Date(lead.createdAt).toLocaleDateString(),
        ])
        .map((e) => e.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "leads.csv");
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <Heading
          title={`Leads (${initialLeads.length})`}
          description="Manage all post of your employ and your post here"
        />
        <Button onClick={handleExport}>Export CSV</Button>
      </div>
      <Separator />

      <div className="mt-5">
        <DataTable
          searchKey="name"
          placeholder="Search a Lead..."
          columns={columns}
          data={initialLeads}
        />
      </div>
    </>
  );
};

export default Leads;
