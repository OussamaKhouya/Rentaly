"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { CarCardProps } from "../../types/index";
import { generateCarImageUrl } from "../../utils";
import CustomButton from "@/components/home/CustomButton";
import { useTranslations } from "use-intl";

interface RentCarProps {
  isRentOpen: boolean;
  closeModal: () => void;
  car: CarCardProps;
}

const RentCar = ({ isRentOpen, closeModal, car }: RentCarProps) => {
  const [userName, setUserName] = useState("");
  const ownerPhoneNumber = "+212767589193"; // Replace with the actual owner's WhatsApp number

  const handleWhatsAppRedirect = () => {
    if (!userName.trim()) {
      alert("Please enter your name before proceeding.");
      return;
    }
    const message = `Hello, I am ${userName} and I am interested in renting the ${car.make} ${car.model} (${car.year}).`;
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
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
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={t("Enter_your_name")}
                      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
