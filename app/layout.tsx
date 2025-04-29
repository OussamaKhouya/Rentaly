import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cathédrale Cars",
  description: "L'élégance au service de votre voyage."
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
