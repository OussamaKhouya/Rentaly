import React from "react";
import { fetchAccount } from "@/lib/admin/actions/car";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import AccountForm from "@/app/admin/account/account-form";
import { notFound } from "next/navigation";

export default async function Page() {
  let account = await fetchAccount();
  if (!account) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: "Account", href: "/admin/account" }]}
      />
      <section className="w-full max-w-2xl">
        <AccountForm account={account} />
      </section>
    </main>
  );
}
