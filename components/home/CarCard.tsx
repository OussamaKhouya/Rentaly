"use client";
import React, {useState} from "react";
import Image from "next/image";
import CustomButton from "@/components/home/CustomButton";
import RentCar from "@/components/home/RentCar";
import {useTranslations} from "use-intl";
import {Car, AccountParams} from "@/types";
import CarImage from "@/components/CarImage";

interface CarCardProps {
    car: Car;
    account: AccountParams;
}

const CarCard = ({car, account}: CarCardProps) => {
    const [isRentOpen, setIsRentOpen] = useState(false);
    const t = useTranslations("CarCard");

    // Status badge styling and content based on availability
    const getStatusBadge = () => {
        const getStatusStyle = () => {
            switch (car?.availabilityStatus) {
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
            <div className={`absolute top-2 right-2 flex items-center px-4 py-1.5 rounded-full ${statusStyle.bg}`}>
                <div className={`w-3 h-3 rounded-full mr-2 ${statusStyle.bullet}`} />
                <span className={`text-sm font-medium ${statusStyle.text}`}>
                    {t(car?.availabilityStatus)}
                </span>
            </div>
        );
    };

    return (
        <div className={"car-card group relative"}>
            {/* Status Badge */}
            {getStatusBadge()}

            <div className={"car-card__content"}>
                <h2 className={"car-card__content-title"}>
                    {car?.brand} {car?.model}
                </h2>
            </div>
            <p className={"flex mt-6 text-[32px] font-extrabold"}>
                <span className={"self-start text-[14px] font-semibold"}>DH</span>
                {car?.pricePerDay}
                <span className={"self-end text-[14px] font-medium"}>/{t("day")}</span>
            </p>
            <div className={"relative w-full h-48 my-3 object-contain"}>
                <CarImage
                    variant="regular"
                    className="w-full h-full"
                    coverImage={car?.imageUrl}
                />
            </div>
            
            {/* Specs Container */}
            <div className={"relative flex w-full mt-2"}>
                <div
                    className={
                        "flex md:group-hover:invisible w-full justify-between text-gray"
                    }
                >
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <Image
                            src={"/steering-wheel.svg"}
                            width={20}
                            height={20}
                            alt={"steering wheel"}
                        />
                        <p className={"text-[14px]"}>
                            {t(car?.transmission)}
                        </p>
                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <Image 
                            src={"/gas.svg"} 
                            width={20} 
                            height={20} 
                            alt={"gas"}
                        />
                        <p className={"text-[14px]"}>{t(car?.fuelType)}</p>
                    </div>
                    <div className={"flex flex-col justify-center items-center gap-2"}>
                        <Image 
                            src={"/calendar.svg"} 
                            width={20} 
                            height={20} 
                            alt={"calendar"}
                        />
                        <p className={"text-[14px]"}>{car?.year}</p>
                    </div>
                </div>

                {/* Desktop Hover Button */}
                <div className="car-card__btn-container absolute top-0 left-0 w-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <CustomButton
                        title={t("Rent_Now")}
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue dark:bg-primary-blue-200"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsRentOpen(true)}
                    />
                </div>
            </div>

            {/* Mobile Button - Outside the specs container */}
            <div className="md:hidden w-full mt-4">
                <CustomButton
                    title={t("Rent_Now")}
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue dark:bg-primary-blue-200"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={() => setIsRentOpen(true)}
                />
            </div>

            <RentCar
                isRentOpen={isRentOpen}
                closeModal={() => setIsRentOpen(false)}
                car={car}
                account={account}
            />
        </div>
    );
};
export default CarCard;