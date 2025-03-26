import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { ThemeProvider } from "@/components/home/ThemeProvider";

export const metadata: Metadata = {
  title: "Rentaly",
  description: "Discover the best cars in the world.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <div className={"overflow-visible"}>
              <Navbar />
            </div>

            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
