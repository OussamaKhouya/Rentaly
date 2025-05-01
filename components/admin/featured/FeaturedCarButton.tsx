"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { updateFeaturedCar } from "@/lib/admin/actions/car";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FeaturedCarButtonProps {
  carId: string;
  isFeatured: boolean;
  onUpdate?: () => void;
}

const FeaturedCarButton = ({ carId, isFeatured, onUpdate }: FeaturedCarButtonProps) => {
  const t = useTranslations("Admin");
  const router = useRouter();

  const handleSetFeatured = async () => {
    if (isFeatured) return; // Don't do anything if already featured
    
    try {
      const result = await updateFeaturedCar(carId);
      
      if (result.success) {
        toast.success(t("Success"), {
          description: t("Car_Featured_Success"),
        });
        
        // Call the onUpdate callback if provided
        if (onUpdate) {
          onUpdate();
        } else {
          // If no callback provided, refresh the page
          router.refresh();
        }
      } else {
        toast.error(t("Error"), {
          description: result.message || t("Something_Went_Wrong"),
        });
      }
    } catch (error) {
      toast.error(t("Error"), {
        description: t("Something_Went_Wrong"),
      });
      console.error(error);
    }
  };

  if (isFeatured) {
    return (
      <Button
        variant="ghost"
        className="text-yellow-500 border-yellow-200 border" 
        disabled
        title={t("Already_Featured")}
      >
        <StarIcon className="h-4 w-4 mr-1 fill-yellow-500" />
        <span className="sr-only">{t("Already_Featured")}</span>
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      className="hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200"
      onClick={handleSetFeatured}
      title={t("Set_Featured")}
    >
      <StarIcon className="h-4 w-4 mr-1" />
      <span className="sr-only">{t("Set_Featured")}</span>
    </Button>
  );
};

export default FeaturedCarButton; 