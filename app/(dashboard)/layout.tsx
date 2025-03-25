import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { getLocale } from "next-intl/server";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "Rentaly Dashboard",
  description: "Rentaly is a car rental management solution.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          <NextIntlClientProvider>
            {children}

            <Toaster
              toastOptions={{
                classNames: {
                  title: "text-sm font-medium text-gray-900",
                  description: "mt-1 text-sm text-gray-500",
                },
              }}
            />
          </NextIntlClientProvider>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
