import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import React from "react";
import EditForm from "@/components/admin/forms/edit-form";
import { fetchCarById, fetchAllCars } from "@/lib/admin/actions/car";
import { getTranslations } from "next-intl/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarParams } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Admin");
  return {
    title: t("Edit_Car"),
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const car = await fetchCarById(id);
  const t = await getTranslations("Admin");
  const cars = await fetchAllCars();

  if (!car) {
    notFound();
  }

  const currentIndex = cars.findIndex((c: CarParams) => c.id === id);
  const prevCar = currentIndex > 0 ? cars[currentIndex - 1] : null;
  const nextCar = currentIndex < cars.length - 1 ? cars[currentIndex + 1] : null;

  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: t("Cars"), href: "/admin/cars" },
            {
              label: t("Edit_Car"),
              href: `/admin/cars/${id}/edit`,
              active: true,
            },
          ]}
        />
        <div className="flex gap-2">
          {prevCar && (
            <Link href={`/admin/cars/${prevCar.id}/edit`}>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {nextCar && (
            <Link href={`/admin/cars/${nextCar.id}/edit`}>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <section className="w-full max-w-2xl">
        <EditForm car={car} id={id} />
      </section>
    </main>
  );
}
