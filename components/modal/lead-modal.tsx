"use client";

import { RxAvatar } from "react-icons/rx";
import { BiMobile } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Locate, Mail, MailOpen } from "lucide-react";

import { Modal } from "@/components/ui/modal";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  mobile: string;
  message: string;
  company_name: string;
  interested_service: string;
  project_budget: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  name,
  email,
  mobile,
  message,
  company_name,
  interested_service,
  project_budget,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-y-2 flex flex-col w-full">
        <div className="flex items-center gap-2">
          <RxAvatar className="h-6 w-6" />
          <span>{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <BiMobile className="h-6 w-6" />
          <span>{mobile}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailOpen />
          <span>{company_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailOpen />
          <span>{interested_service}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailOpen />
          <span>{project_budget} </span>
        </div>
      </div>
    </Modal>
  );
};
