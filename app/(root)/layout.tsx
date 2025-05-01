import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { ThemeProvider } from "@/components/home/ThemeProvider";
import { fetchAccount } from "@/lib/admin/actions/car";
import Head from "next/head";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const account = await fetchAccount();

  return (
    <html lang={locale} suppressHydrationWarning>
    <Head>
      <title>
        Cathédrale Cars
      </title>
      <meta
          name="description"
          content="L'élégance au service de votre voyage."
          key="desc"
      />
    </Head>
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
