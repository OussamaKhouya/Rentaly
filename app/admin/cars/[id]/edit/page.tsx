import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import React from "react";
import EditForm from "@/components/admin/forms/edit-form";
import { fetchCarById } from "@/lib/admin/actions/car";

export const metadata: Metadata = {
  title: "Edit Car",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const car = await fetchCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Cars", href: "/admin/cars" },
          {
            label: "Edit Car",
            href: `/admin/cars/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm car={car} id={id} />
    </main>
  );
}
