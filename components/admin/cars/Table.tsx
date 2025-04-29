"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {DeleteCar, UpdateCar} from "@/components/admin/cars/buttons";
import React from "react";
import CarImage from "@/components/CarImage";
import {Car, CarParams} from "@/types";
import {fetchAllCars} from "@/lib/admin/actions/car";
import {useTranslations} from "next-intl";

const CarsTable = () => {
    const t = useTranslations("Admin");
    const [cars, setCars] = React.useState<CarParams[]>([]);

    React.useEffect(() => {
        fetchAllCars().then(setCars);
    }, []);

    const getStatusBadge = (status: string) => {
        const getStatusStyle = () => {
            switch (status) {
                case "available":
                    return {
                        bg: "bg-green-50",
                        text: "text-green-600",
                        bullet: "bg-green-600"
                    };
                case "rented":
                    return {
                        bg: "bg-red-50",
                        text: "text-red-600",
                        bullet: "bg-red-600"
                    };
                case "processing":
                    return {
                        bg: "bg-yellow-50",
                        text: "text-yellow-600",
                        bullet: "bg-yellow-600"
                    };
                case "under_maintenance":
                    return {
                        bg: "bg-blue-50",
                        text: "text-blue-600",
                        bullet: "bg-blue-600"
                    };
                default:
                    return {
                        bg: "bg-gray-50",
                        text: "text-gray-600",
                        bullet: "bg-gray-600"
                    };
            }
        };

        const statusStyle = getStatusStyle();

        return (
            <div className={`flex items-center px-4 py-1.5 rounded-full ${statusStyle.bg}`}>
                <div className={`w-3 h-3 rounded-full mr-2 ${statusStyle.bullet}`} />
                <span className={`text-sm font-medium ${statusStyle.text}`}>
                    {t(status)}
                </span>
            </div>
        );
    };

    return (
        <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                        <div className="md:hidden">
                            {cars?.map((c) => (
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
                                            <p className="text-xs">{t("Price")}</p>
                                            <p className="font-medium">{c.pricePerDay}</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">{t("Fuel_Type")}</p>
                                            <p className="font-medium">{t(c.fuelType || "")}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-sm border-b py-5">
                                        <p>{t(c.transmission || "")} </p>
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
                                        {t("Brand")}
                                    </TableHead>
                                    <TableHead scope="col" className="px-3 py-5 font-medium">
                                        {t("Model")}
                                    </TableHead>
                                    <TableHead scope="col" className="px-3 py-5 font-medium">
                                        {t("Year")}
                                    </TableHead>
                                    <TableHead scope="col" className="px-3 py-5 font-medium">
                                        {t("Price")}
                                    </TableHead>
                                    <TableHead scope="col" className="px-3 py-5 font-medium">
                                        {t("Fuel_Type")}
                                    </TableHead>
                                    <TableHead scope="col" className="px-3 py-5 font-medium">
                                        {t("Transmission")}
                                    </TableHead>
                                    <TableHead scope="col" className="px-3 py-5 font-medium">
                                        {t("Status")}
                                    </TableHead>
                                    <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                                        <span className="sr-only">{t("Actions")}</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white">
                                {cars.map((car: CarParams) => {
                                    return (
                                        <TableRow
                                            key={car.id}
                                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                        >
                                            <TableCell className="whitespace-nowrap py-3">
                                                <div className="flex items-center gap-2">
                                                    <CarImage variant="medium"
                                                              coverImage={car.imageUrl}/>
                                                    <p>{car.brand}</p>
                                                </div>
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap px-3 py-3">
                                                {car.model}
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap px-3 py-3">
                                                {car.year}
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap px-3 py-3">
                                                {car.pricePerDay} DH
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap px-3 py-3">
                                                {t(car.fuelType || "")}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap px-3 py-3">
                                                {t(car.transmission || "")}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap px-3 py-3">
                                                {getStatusBadge(car.availabilityStatus || "")}
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <div className="flex justify-end gap-3">
                                                    {car.id && <UpdateCar id={car.id}/>}
                                                    {car.id && <DeleteCar id={car.id}/>}
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
