import React from "react";
import { fetchAccount } from "@/lib/admin/actions/car";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { notFound } from "next/navigation";
import AccountForm from "@/components/admin/forms/account-form";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  let account = await fetchAccount();
  if (!account) {
    notFound();
  }
  const t = await getTranslations("Admin");

  return (
      <main>
        <Breadcrumbs
            breadcrumbs={[{ label: t("Account.info"), href: "/admin" }]}
        />
        <section className="w-full max-w-2xl">
          <AccountForm account={account} />
        </section>
      </main>
  );
}
