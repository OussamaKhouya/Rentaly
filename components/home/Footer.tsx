"use client";
import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../../consants";
import { useTranslations } from "use-intl";
const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer
      className="flex flex-col
        text-black-100 mt-12 border-t
        border-gray-100"
    >
      <div
        className="flex max-md:flex-colflex-weap justify-between gap-5 sm:px-16
            px-6 py-10"
      >
        <div
          className="flex flex-col
                justify-start items-start gap-6"
        >
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
          <p
            className="text-base
                    text-gray-700 dark:text-gray-300"
          >
            Rantaly 2025 <br />
            {t("All_rights_reserved")} &copy;
          </p>
        </div>
        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className={"font-bold"}>{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500 dark:hover:text-gray-300 transition-colors duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "flex justify-between" +
          "items-center flex-wrap mt-10 border-t" +
          "border-gray-100 sm:px16 px-6 py-10"
        }
      >
        <p className=" dark:text-gray-300">
          @2025 Rantaly.{t("All_rights_reserved")}
        </p>
        <div className={"footer__copyrights-link"}>
          <Link
            href={"/public"}
            className={
              "text-gray-500 dark:text-gray-300 transition-colors duration-300"
            }
          >
            {t("Privacy_Policy")}
          </Link>
          <Link
            href={"/public"}
            className={
              "text-gray-500 dark:text-gray-300 transition-colors duration-300"
            }
          >
            {t("Terms_of_Use")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
