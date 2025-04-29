import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import React from "react";
import EditForm from "@/components/admin/forms/edit-form";
import { fetchCarById } from "@/lib/admin/actions/car";
import { getTranslations } from "next-intl/server";

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

  if (!car) {
    notFound();
  }

  return (
    <main>
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
      <EditForm car={car} id={id} />
    </main>
  );
}
