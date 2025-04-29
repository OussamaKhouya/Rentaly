import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CarsTable from "@/components/admin/cars/Table";
import RefreshButton from "@/components/admin/cars/RefreshButton";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("Admin");

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">{t("Cars")}</h2>
        <div className="flex gap-2">
          <RefreshButton />
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/cars/new" className="text-white">
              + {t("Add_Car")}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <CarsTable />
      </div>
    </section>
  );
};

export default Page;
