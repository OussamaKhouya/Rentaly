import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { ThemeProvider } from "@/components/home/ThemeProvider";
import { fetchAccount } from "@/lib/admin/actions/car";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const account = await fetchAccount();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <div className={"overflow-visible"}>
              <Navbar account={account} />
            </div>

            {children}
            <Footer account={account} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
