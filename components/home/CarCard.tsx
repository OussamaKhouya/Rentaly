"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import CustomButton from "@/components/home/CustomButton";
import {
  calculateCarRent,
  generateCarImageUrl,
  getDriveTypeAbbreviation,
} from "../../utils";
import CarDetails from "@/components/home/CarDetails";
import RentCar from "@/components/home/RentCar";
import { useTranslations } from "use-intl";
import { CarProps } from "../../types/index";
interface CarCardProps {
  car: CarProps;
}
const CarCard = ({ car }: CarCardProps) => {
  const { make, model, year, id, trany, fueltype1, drive, city08 } = car;
  const carRent = calculateCarRent(city08, year);
  const driveType = getDriveTypeAbbreviation(drive);
  const [isOpen, setIsOpen] = useState(false);
  const [isRentOpen, setIsRentOpen] = useState(false);
  const t = useTranslations("CarCard");
  return (
    <div className={"car-card group"}>
      <div className={"car-card__content"}>
        <h2 className={"car-card__content-title"}>
          {make} {model}
        </h2>
      </div>
      <p className={"flex mt-6 text-[32px] font-extrabold"}>
        <span className={"self-start text-[14px] font-semibold"}>$</span>
        {carRent}
        <span className={"self-end text-[14px] font-medium"}>/{t("day")}</span>
      </p>
      <div className={"relative w-full h-40 my-3 object-contain"}>
        <Image
          src={generateCarImageUrl(car)}
          alt={"car model"}
          fill
          priority
          className={"object-contain"}
        />
      </div>
      <div className={"relative flex w-full mt-2"}>
        <div
          className={
            "flex group-hover:invisible w-full justify-between text-gray"
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
              {trany === "a" ? "Manual" : "Automatic"}
            </p>
          </div>
          <div className={"flex flex-col justify-center items-center gap-2"}>
            <Image src={"/tire.svg"} width={20} height={20} alt={"tire"} />
            <p className={"text-[14px]"}>{driveType.toUpperCase()}</p>
          </div>
          <div className={"flex flex-col justify-center items-center gap-2"}>
            <Image src={"/gas.svg"} width={20} height={20} alt={"gas"} />
            <p className={"text-[14px]"}>{city08} MGP</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title={t("View_Details")}
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue dark:bg-primary-blue-200"
            textStyles="text-white text-[14px] leading-[17px] font-bold "
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
          <CustomButton
            title={t("Rent_Now")}
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue dark:bg-primary-blue-200"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsRentOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
      <RentCar
        isRentOpen={isRentOpen}
        closeModal={() => setIsRentOpen(false)}
        car={car}
      />
    </div>
  );
};
export default CarCard;
