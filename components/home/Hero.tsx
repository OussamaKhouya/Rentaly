"use client";

import React from "react";
import CustomButton from "@/components/home/CustomButton";
import Image from "next/image";
import { useTranslations } from "use-intl";

function Hero() {
  const t = useTranslations("Hero");
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">{t("find_statement")}</h1>
        <p className="hero__subtitle">{t("description")}</p>

        <CustomButton
          title={t("Explore_Cars")}
          containerStyles="bg-primary-blue text-white rounded-full mt-10 CustomButton"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
}

export default Hero;
