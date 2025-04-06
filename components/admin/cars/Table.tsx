import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {DeleteCar, UpdateCar} from "@/components/admin/cars/buttons";
import React from "react";
import CarImage from "@/components/CarImage";
import {Car, CarParams} from "@/types";
import {fetchAllCars} from "@/lib/admin/actions/car";

const CarsTable = async () => {
    const latestCars = await fetchAllCars();

    return (
        <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                        <div className="md:hidden">
                            {latestCars?.map((c) => (
                                <div key={c.id} className="mb-6 w-full rounded-md bg-white p-4">
                                    <div className="flex items-center justify-center border-b pb-4">
                                        <div>
                                            <CarImage
                                                variant="regular"
                                                coverImage={c.imageUrl}
                                            />
                                            <p className="text-sm text-center text-gray-500">
                                                {c.brand} {c.model} {c.year}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between border-b py-5">
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">Price</p>
                                            <p className="font-medium">{c.pricePerDay}</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">Fuel Type</p>
                                            <p className="font-medium">{c.fuelType}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-sm border-b py-5">
                                        <p>{c.transmission} </p>
                                    </div>
                                    <div className="flex justify-end pe-4 pt-4 gap-3">
                                        {c.id && <UpdateCar id={c.id}/>}
                                        {c.id && <DeleteCar id={c.id}/>}
                                    </div>
                                </div>
                            ))}
                        </div>

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
                                {latestCars.map((t: CarParams) => {
                                    return (
                                        <TableRow
                                            key={t.id}
                                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                        >
                                            <TableCell className="whitespace-nowrap py-3">
                                                <div className="flex items-center gap-2">
                                                    <CarImage variant="medium"
                                                              coverImage={t.imageUrl}/>
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
                                                    {t.id && <UpdateCar id={t.id}/>}
                                                    {t.id && <DeleteCar id={t.id}/>}
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
        </div>
    );
};

export default CarsTable;
