"use client";

import React, {Fragment, useState, useEffect} from "react";
import CustomButton from "@/components/home/CustomButton";
import Image from "next/image";
import { useTranslations } from "use-intl";
import { CalendarDays, Car, Fuel, Gauge, DollarSign } from "lucide-react";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import RentCar from "./RentCar";
import { Car as CarType } from "@/types";
import { fetchFeaturedCar } from "@/lib/admin/actions/car";

function Hero() {
  const t = useTranslations("Hero");
  const [isRentOpen, setIsRentOpen] = useState(false);
  const [carOfTheWeek, setCarOfTheWeek] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeaturedCar = async () => {
      try {
        const featuredCar = await fetchFeaturedCar();
        setCarOfTheWeek(featuredCar);
      } catch (error) {
        console.error("Error fetching featured car:", error);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedCar();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0061ff]"></div>
      </div>
    );
  }

  if (!carOfTheWeek) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("No_Featured_Car")}</h1>
        <p className="text-gray-600 max-w-md">{t("Check_Back_Soon")}</p>
      </div>
    );
  }

  // Define color schemes for different fuel types
  const fuelTypeColors = {
    petrol: "bg-red-50 text-red-600",
    diesel: "bg-blue-50 text-blue-600",
    electric: "bg-green-50 text-green-600",
    hybrid: "bg-purple-50 text-purple-600",
  };

  // Get the color for the current fuel type
  const fuelColor = fuelTypeColors[carOfTheWeek.fuelType || "petrol"];

  return (
    <>
      <div className="flex flex-col-reverse xl:flex-row gap-5 relative z-0 max-w-[1440px] mx-auto">
        <div className="flex-1 pt-8 md:pt-16 xl:pt-36 px-4 md:px-8 xl:px-12">
          <div className="relative">
            <h1 className="font-medium text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col text-gray-900">
              <span className="relative mt-4">
                <span className="font-black italic text-[#0061ff] tracking-normal relative inline-block">
                  {carOfTheWeek.brand}
                  <svg
                    className="fill-[#0061ff] w-3.5 h-3.5 md:w-5 md:h-5 absolute -top-0 -left-1"
                    viewBox="0 0 68 74"
                  >
                    {/* SVG path remains the same */}
                  </svg>
                </span>
                <span className="font-black italic text-[#312783] tracking-normal ml-2">
                  {carOfTheWeek.model}
                </span>
              </span>
            </h1>
          </div>

          <p className="mt-2 md:mt-8 text-gray-600 dark:text-gray-300 text-base md:text-lg line-clamp-3 md:line-clamp-none">
            {carOfTheWeek.description ||
              `Experience luxury and performance with the ${carOfTheWeek.year} ${carOfTheWeek.brand} ${carOfTheWeek.model}. 
             Perfect for your next adventure with comfort and style.`}
          </p>

          <div className="mt-4 md:mt-6 flex flex-col gap-3 md:gap-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {/* Year Card */}
              <div
                className={`p-3 md:p-4 rounded-lg shadow-md bg-blue-50 text-blue-600 flex items-center h-[72px] md:h-[80px]`}
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-sm block">
                    {t("Year")}
                  </span>
                  <p className="text-base md:text-lg font-bold">
                    {carOfTheWeek.year}
                  </p>
                </div>
              </div>

              {/* Transmission Card */}
              <div
                className={`p-3 md:p-4 rounded-lg shadow-md bg-green-50 text-green-600 flex items-center h-[72px] md:h-[80px]`}
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <Car size={20} />
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-sm block">
                    {t("Transmission")}
                  </span>
                  <p className="text-base md:text-lg font-bold capitalize">
                    {t(carOfTheWeek.transmission)}
                  </p>
                </div>
              </div>

              {/* Fuel Type Card */}
              <div
                className={`p-3 md:p-4 rounded-lg shadow-md ${fuelColor} flex items-center h-[72px] md:h-[80px]`}
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <Fuel size={20} />
                </div>
                <div>
                  <span className="font-semibold text-xs md:text-sm block">
                    {t("Fuel_Type")}
                  </span>
                  <p className="text-base md:text-lg font-bold capitalize">
                    {t(carOfTheWeek.fuelType)}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Price Card */}
            <div className="p-4 md:p-6 rounded-lg shadow-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center h-[80px] md:h-[100px]">
              <div className="w-12 h-12 bg-white text-orange-500 rounded-full mr-4 flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-sm md:text-base block text-yellow-100">
                  {t("Special_Offer")}
                </span>
                <div className="flex items-baseline">
                  <p className="text-2xl md:text-3xl font-bold">
                    {carOfTheWeek.pricePerDay}
                  </p>
                  <p className="ml-2 text-sm md:text-base opacity-80">
                    {t("DH_per_day")}
                  </p>
                </div>
              </div>
              <div className="bg-white text-orange-500 px-3 md:px-4 py-1.5 rounded-full text-sm font-bold hidden xs:block">
                {t("Save_15")}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsRentOpen(true)}
            className="group relative px-10 py-4 bg-[#0061ff] text-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 active:scale-95  mt-6 md:mt-10 w-full sm:w-auto"
          >
            <span className="relative z-10 text-lg font-semibold flex items-center justify-between gap-3 ">
              {t("Rent_Now")}
              <svg
                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0061ff] to-[#312783] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        <div className="h-[280px] sm:h-[320px] md:h-[360px] xl:h-screen w-full xl:flex-[1.5] flex justify-center xl:justify-end items-end">
          <div className="relative w-full max-w-[500px] h-full flex">
            <IKImage
              path={carOfTheWeek.imageUrl || "/logo.svg"}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt={`${carOfTheWeek.brand} ${carOfTheWeek.model}`}
              priority
              fill
              loading="lazy"
              lqip={{ active: true }}
              className="object-contain"
            />
          </div>
          <div
            id="hero__image-overlay"
            className="absolute -z-10 top-0 right-0 w-full xl:h-screen h-[300px] xl:-top-24 xl:-right-1/2 bg-hero-bg bg-repeat-round overflow-hidden"
          />
        </div>
      </div>

      <RentCar 
        isRentOpen={isRentOpen} 
        closeModal={() => setIsRentOpen(false)} 
        car={carOfTheWeek}
      />
    </>
  );
}

export default Hero;
