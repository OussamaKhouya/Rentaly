"use client";

import React, { useState } from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { handleSignOut } from "@/lib/admin/actions/car";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-1 opacity-70 md:hidden p-2 bg-primary-admin text-white rounded z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className="sr-only">Hide Menu</span>
        ) : (
          <span className="sr-only">Show Menu</span>
        )}
        {isOpen ? "×" : "≡"}
      </button>

      {/* Sidebar: Hidden on mobile if not toggled open, always visible on md and above */}
      <div className={`${isOpen ? "block" : "hidden"} md:block admin-sidebar`}>
        <div>
          <div className="logo">
            <Image
              src="/icons/admin/speedometer.svg"
              alt="logo"
              height={37}
              width={37}
            />
            <h1>Rentaly</h1>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {adminSideBarLinks.map((link) => {
              const isSelected =
                (link.route !== "/admin" &&
                  pathname.includes(link.route) &&
                  link.route.length > 1) ||
                pathname === link.route;

              return (
                <Link href={link.route} key={link.route}>
                  <div
                    className={cn(
                      "link",
                      isSelected && "bg-primary-admin shadow-sm",
                    )}
                  >
                    <div className="relative size-5">
                      <Image
                        src={link.img}
                        alt="icon"
                        fill
                        className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                      />
                    </div>

                    <p className={cn(isSelected ? "text-white" : "text-dark")}>
                      {link.text}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <ul className="flex flex-row items-center gap-8">
          <li>
            <div className="user">
              <Avatar>
                <AvatarFallback className="bg-amber-100">
                  {getInitials(session?.user?.name || "IN")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col max-md:hidden">
                <p className="font-semibold text-dark-200">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-light-500">{session?.user?.email}</p>
              </div>
            </div>
            <li>
              <form action={handleSignOut}>
                <Button type="submit" className="w-full">
                  Logout <LogOut />
                </Button>
              </form>
            </li>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
