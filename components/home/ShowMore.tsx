"use client";

import { useRouter } from "next/navigation";

import { ShowMoreProps } from "../../types/index";
import { updateSearchParams } from "../../utils";
import CustomButton from "@/components/home/CustomButton";
import { useTranslations } from "use-intl";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    // Calculate the new limit based on the page number and navigation type
    const newLimit = (pageNumber + 1) * 10;

    // Update the "limit" search parameter in the URL with the new value
    const newPathname = updateSearchParams("limit", `${newLimit}`);

    router.push(newPathname, { scroll: false });
  };
  const t = useTranslations("ShowMore");
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title={t("Show_More")}
          containerStyles="bg-primary-blue dark:bg-primary-blue-200 rounded-full text-white CustomButton"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
