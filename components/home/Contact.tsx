"use client"
import Image from 'next/image';
import Link from "next/link";
import { useTranslations } from "use-intl";
import { AccountParams } from '@/types/index';

interface ContactProps {
  account: AccountParams;
}

const Contact = ({ account }: ContactProps) => {
  const t = useTranslations('Contact');
  const mapSrc = account?.map || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.401186963287!2d-6.792667484800293!3d34.04085822341532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76cf56d96f5c5b%3A0xbbeffcad32b1c0c4!2sYLH%20CAR!5e0!3m2!1sen!2sma!4v1702309460367!5m2!1sen!2sma";

  return (
    <section id="contact_us" className="mt-16 flex flex-col md:flex-row items-center md:items-start gap-8 py-16">
      {/* Contact Information */}
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold dark:text-white">{t("Contact_us")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t("come_to_us")}</p>
        </div>

        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-transparent rounded-full">
              <Image 
                className="object-contain block dark:hidden" 
                src="/phone-icon.png" 
                width={24} 
                height={24} 
                alt="Phone"
              />
              <Image 
                className="object-contain hidden dark:block" 
                src="/phone-dark-icon.png" 
                width={24} 
                height={24} 
                alt="Phone"
              />
            </div>
            <div>
              <p className="text-lg font-medium dark:text-white">{account?.phone || "06 61 39 71 47 / 07 65 57 59 58"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("phone")}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-transparent rounded-full">
              <Image 
                className="object-contain block dark:hidden" 
                src="/email-icon.png" 
                width={24} 
                height={24} 
                alt="Email"
              />
              <Image 
                className="object-contain hidden dark:block" 
                src="/email-dark-icon.png" 
                width={24} 
                height={24} 
                alt="Email"
              />
            </div>
            <div>
              <p className="text-lg font-medium dark:text-white">{account?.email || "reservation@ylhcar.ma"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("email")}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-transparent rounded-full">
              <Image 
                className="object-contain block dark:hidden" 
                src="/location-icon4.svg" 
                width={24} 
                height={24} 
                alt="Location"
              />
              <Image 
                className="object-contain hidden dark:block" 
                src="/location-dark-icon.png" 
                width={24} 
                height={24} 
                alt="Location"
              />
            </div>
            <div>
              <p className="text-lg font-medium dark:text-white">{account?.address || "23 guich oudaya, Rabat, Morocco"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("address")}</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 pt-4">
          {account?.facebook && (
            <Link href={account.facebook} className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <Image src="/facebook.svg" width={24} height={24} alt="Facebook"  />
            </Link>
          )}
          {account?.instagram && (
            <Link href={account.instagram} className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <Image src="/instagram.svg" width={24} height={24} alt="Instagram"  />
            </Link>
          )}
          {account?.whatsapp && (
            <Link href={account.whatsapp} className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <Image src="/whatsapp.svg" width={24} height={24} alt="WhatsApp"  />
            </Link>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        />
      </div>
    </section>
  );
};

export default Contact;
