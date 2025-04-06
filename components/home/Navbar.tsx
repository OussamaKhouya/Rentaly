"use client";
import Link from "next/link";
import { useTranslations } from "use-intl";
import LocaleSwitcher from "@/components/home/LocaleSwitcher";
import DarkModeToggle from "@/components/home/DarkModeToggle";
import React from "react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { AccountParams } from "@/types";

interface NavbarProps {
  account: AccountParams;
}

const Navbar = ({ account }: NavbarProps) => {
  const t = useTranslations("Navbar");

  return (
    <header className="w-full sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <IKImage
            path={account?.logo || ""}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="logo"
            height={100}
            width={118}
          />
        </Link>

        <div className="flex items-center gap-6">
          <LocaleSwitcher />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
