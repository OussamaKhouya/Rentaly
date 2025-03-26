"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/components/home/CustomButton";
import { useTranslations } from "use-intl";
import LocaleSwitcher from "@/components/home/LocaleSwitcher";
import DarkModeToggle from "@/components/home/DarkModeToggle";

const Navbar = () => {
  const t = useTranslations("Navbar");
  return (
    <header className="w-full sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/public" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain block dark:hidden"
          />
          <Image
            src="/logod.png"
            alt="logo"
            width={118}
            height={18}
            className="object-contain hidden dark:block"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/sign-in"
            className="custom-btn  rounded-full bg-primary-blue dark:bg-white xl:bg-primary-blue-300 min-w-[130px] dark:bg-primary-blue-200 text-black"
          >
            {t("Sign_In")}
          </Link>
          <LocaleSwitcher />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
