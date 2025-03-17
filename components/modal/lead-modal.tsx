"use client";

import { RxAvatar } from "react-icons/rx";
import { BiMobile } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  Locate,
  Mail,
  MailOpen,
  IndianRupee,
  Globe,
  Building2,
  MessageCircle,
} from "lucide-react";

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
          <RxAvatar className="h-5 w-5" />
          <span>{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <BiMobile className="h-5 w-5" />
          <span>{mobile}</span>
        </div>
        {company_name && (
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <span>{company_name}</span>
          </div>
        )}
        {interested_service && (
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>{interested_service}</span>
          </div>
        )}
        {project_budget && (
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            <span>{project_budget} </span>
          </div>
        )}
        {message && (
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>{message} </span>
          </div>
        )}
      </div>
    </Modal>
  );
};
