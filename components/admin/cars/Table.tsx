import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/database/drizzle";
import { cars } from "@/database/schema";
import { desc } from "drizzle-orm";
import { DeleteCar, UpdateCar } from "@/components/admin/cars/buttons";
import Image from "next/image";
import React from "react";
import CarImage from "@/components/CarImage";

const CarsTable = async () => {
  const latestCars = (await db
    .select()
    .from(cars)
    .limit(10)
    .orderBy(desc(cars.createdAt))) as Car[];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow>
                <TableHead
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6"
                >
                  Brand
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Model
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Year
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Price Per Day
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Fuel Type
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Transmission
                </TableHead>
                <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {latestCars.map((t: Car) => {
                return (
                  <TableRow
                    key={t.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <TableCell className="whitespace-nowrap py-3">
                      <div className="flex items-center gap-2">
                        <CarImage variant="small" coverImage={t.imageUrl} />
                        <p>{t.brand}</p>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {t.model}
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {t.year}
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {t.pricePerDay} DH
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {t.fuelType}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {t.transmission}
                    </TableCell>

                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateCar id={t.id} />

                        <DeleteCar id={t.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CarsTable;
