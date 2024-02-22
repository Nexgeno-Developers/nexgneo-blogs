"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { RxAvatar } from "react-icons/rx";
import { Locate, Mail, MailOpen } from "lucide-react";
import { BiMobile } from "react-icons/bi";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  country: string;
  mobile: string;
  message: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  name,
  email,
  country,
  mobile,
  message,
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
          <Locate />
          <span>{country}</span>
        </div>
        <div className="flex items-center gap-2">
          <BiMobile className="h-6 w-6" />
          <span>{mobile}</span>
        </div>
        <div className="flex items-center gap-2">
          <MailOpen />
          <span>{message}</span>
        </div>
      </div>
    </Modal>
  );
};
