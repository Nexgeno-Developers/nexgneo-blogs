"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { Badge } from "@/components/ui/badge";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-black">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-3" align="end">
        <DropdownMenuItem>
          <p className="flex items-center gap-2">
            <strong>Name:</strong>
            <span>{user?.name}</span>
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p className="flex items-center gap-2">
            <strong>Email:</strong>
            <span>{user?.email}</span>
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p className="flex items-center gap-2">
            <strong>Role:</strong>
            {user?.role === "ADMIN" ? (
              <Badge variant="success">Admin</Badge>
            ) : (
              <Badge>User</Badge>
            )}
          </p>
        </DropdownMenuItem>
        <Link href="/admin/profile">
          <DropdownMenuItem>
            <CgProfile className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
