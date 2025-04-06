"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "use-intl";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import { AccountParams } from "@/types";


interface FooterProps {
  account: AccountParams;
}

const Footer = ({ account }: FooterProps) => {
  const t = useTranslations("Footer");

  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <IKImage
            path={account?.logo || ""}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="logo"
            fill
            className="object-contain"
          />
          <p className="text-base text-gray-700 dark:text-white">
            {account?.description || t("description")}
          </p>
        </div>

        <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20 dark:text-gray-300">
          <div className="flex flex-col gap-6">
            <h3 className="font-bold dark:text-white">{t("Links")}</h3>
            <Link href="#contact_us">{t("Contact")}</Link>
            <Link href="/terms">{t("Terms")}</Link>
            <Link href="/privacy">{t("Privacy")}</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-bold dark:text-white">{t("Contact")}</h3>
            <p>{account?.email || t("email")}</p>
            <p>{account?.phone || t("phone")}</p>
            <p>{account?.address || t("address")}</p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-bold dark:text-white">{t("Social")}</h3>
            <Link href={account?.facebook || "#"}>{t("Facebook")}</Link>
            <Link href={account?.instagram || "#"}>{t("Instagram")}</Link>
            <Link href={account?.whatsapp || "#"}>{t("WhatsApp")}</Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-gray-700 mt-10 border-t border-gray-100 sm:px-16 px-6 py-10 dark:text-white">
        <p>@2025 Cathédrale Cars. {t("rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
