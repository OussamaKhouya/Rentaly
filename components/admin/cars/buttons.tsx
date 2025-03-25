import Link from "next/link";
import { PencilIcon, PlusIcon, RefreshCw, TrashIcon } from "lucide-react";
import { deleteCar, refreshCars } from "@/lib/admin/actions/car";
import { Button } from "@/components/ui/button";
import React from "react";

export function CreateInvoice() {
  return (
    <Link
      href="/admin/cars/new"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCar({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/cars/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" color="#0089F1" />
    </Link>
  );
}

export function DeleteCar({ id }: { id: string }) {
  const deleteCarWithId = deleteCar.bind(null, id);

  return (
    <form action={deleteCarWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" color="#EF3A4B" />
      </button>
    </form>
  );
}
