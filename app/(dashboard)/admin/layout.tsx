import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { NextIntlClientProvider } from "next-intl";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <NextIntlClientProvider>
      <main className="flex min-h-screen w-full overflow-hidden">
        <Sidebar session={session} />

        <div className="admin-container overflow-y-auto">
          <Header session={session} />
          {children}
        </div>
      </main>
    </NextIntlClientProvider>
  );
};
export default Layout;
