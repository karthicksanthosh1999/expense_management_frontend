import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheckIcon, LogOutIcon, UserCircle } from "lucide-react";
import Link from "next/link";

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCircle size={30} className="text-[#A2A2A7]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#27273A] border-0 text-white">
        <DropdownMenuItem className="hover:bg-black">
          <BadgeCheckIcon />
          Account
        </DropdownMenuItem>
        <Link href={"/login"}>
          <DropdownMenuItem>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
