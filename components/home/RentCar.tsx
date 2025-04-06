"use client";

import React, {Fragment, useState} from "react";
import Image from "next/image";
import {Dialog, Transition} from "@headlessui/react";
import CustomButton from "@/components/home/CustomButton";
import {useTranslations} from "use-intl";
import CarImage from "../CarImage";
import {Car} from "@/types";

interface RentCarProps {
    isRentOpen: boolean;
    closeModal: () => void;
    car: Car;
}

const RentCar = ({isRentOpen, closeModal, car}: RentCarProps) => {
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        dates: ""
    });
    const ownerPhoneNumber = "+212767589193"; // Replace with the actual owner's WhatsApp number

    const validateForm = () => {
        const newErrors = {
            name: "",
            phone: "",
            dates: ""
        };
        let isValid = true;

        if (!userName.trim()) {
            newErrors.name = t("Name_Required");
            isValid = false;
        }

        if (!phoneNumber.trim()) {
            newErrors.phone = t("Phone_Required");
            isValid = false;
        } else if (!/^\+?[\d\s-]{10,}$/.test(phoneNumber)) {
            newErrors.phone = t("Invalid_Phone");
            isValid = false;
        }

        if (!startDate || !endDate) {
            newErrors.dates = t("Dates_Required");
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleWhatsAppRedirect = () => {
        if (!validateForm()) {
            return;
        }
        const message = t("WhatsApp_Message", {
            name: userName,
            brand: car.brand,
            model: car.model,
            year: car.year,
            phone: phoneNumber,
            startDate: startDate,
            endDate: endDate
        });
        const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };
    const t = useTranslations("RentCar");

    return (
        <>
            <Transition appear show={isRentOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-out duration-300"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                                        onClick={closeModal}
                                    >
                                        <Image
                                            src="/close.svg"
                                            alt="close"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </button>

                                    <div className="flex-1 flex flex-col gap-3">
                                        <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg overflow-hidden">
                                            <CarImage
                                                variant="small"
                                                className="w-full h-full"
                                                coverImage={car.imageUrl || "/logo.svg"}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-700 font-medium">
                                                {t("Enter_your_name")}
                                            </label>
                                            <input
                                                type="text"
                                                value={userName}
                                                onChange={(e) => {
                                                    setUserName(e.target.value);
                                                    setErrors(prev => ({ ...prev, name: "" }));
                                                }}
                                                placeholder={t("Enter_your_name")}
                                                className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-700 font-medium">
                                                {t("Phone_Number")}
                                            </label>
                                            <input
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);
                                                    setErrors(prev => ({ ...prev, phone: "" }));
                                                }}
                                                placeholder={t("Enter_phone")}
                                                className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-700 font-medium">
                                                {t("Select_dates")}
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm text-gray-600">
                                                        {t("Start_Date")}
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => {
                                                            setStartDate(e.target.value);
                                                            setErrors(prev => ({ ...prev, dates: "" }));
                                                        }}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className={`border ${errors.dates ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm text-gray-600">
                                                        {t("End_Date")}
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={endDate}
                                                        onChange={(e) => {
                                                            setEndDate(e.target.value);
                                                            setErrors(prev => ({ ...prev, dates: "" }));
                                                        }}
                                                        min={startDate || new Date().toISOString().split('T')[0]}
                                                        className={`border ${errors.dates ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    />
                                                </div>
                                            </div>
                                            {errors.dates && (
                                                <p className="text-red-500 text-sm mt-1">{errors.dates}</p>
                                            )}
                                        </div>

                                        <CustomButton
                                            title={t("Contact_Owner")}
                                            containerStyles="w-full py-[16px] rounded-full bg-primary-blue CustomButton"
                                            textStyles="text-white text-[14px] leading-[17px] font-bold"
                                            rightIcon="/right-arrow.svg"
                                            handleClick={() => handleWhatsAppRedirect()}
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default RentCar;
