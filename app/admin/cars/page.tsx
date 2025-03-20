import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TransactionsTable from "@/components/admin/table/DataTable";
import { db } from "@/database/drizzle";
import { cars } from "@/database/schema";
import { desc } from "drizzle-orm";

const Page = async () => {
  const latestCars = (await db
    .select()
    .from(cars)
    .limit(10)
    .orderBy(desc(cars.createdAt))) as Car[];

  console.log({ latestCars });
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Cars</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/cars/new" className="text-white">
            + Create a New Car
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <TransactionsTable transactions={latestCars} />
      </div>
    </section>
  );
};

export default Page;
