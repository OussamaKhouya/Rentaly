"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "h-8 w-8",
  small: "h-12 w-12",
  medium: "h-16 w-16",
  regular: "h-40 w-40",
  wide: "h-40 w-60",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor?: string;
  coverImage: string | null;
  height?: number;
  width?: number;
}

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Authentication failed:", error);
    return null;
  }
};

const CarImage = ({
  className,
  variant = "regular",
  coverImage,
  height,
  width,
}: Props) => {
  // Default image if coverImage is null or empty
  const imagePath = coverImage || "default-car-image.jpg";

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          variantStyles[variant],
          className,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {(height && width) ? (
            <IKImage
              path={imagePath}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt="Car image"
              height={height}
              width={width}
              priority
              className="rounded-sm object-contain max-w-full max-h-full"
              loading="lazy"
              lqip={{ active: true }}
            />
          ) : (
            <IKImage
              path={imagePath}
              urlEndpoint={config.env.imagekit.urlEndpoint}
              alt="Car image"
              fill
              className="rounded-sm object-contain p-1"
              loading="lazy"
              lqip={{ active: true }}
            />
          )}
        </div>
      </div>
    </ImageKitProvider>
  );
};

export default CarImage;
