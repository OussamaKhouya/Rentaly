"use server";

import { db } from "@/database/drizzle";
import { cars } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getCarOfTheWeek = async () => {
  try {
    const [car] = await db
      .select({
        id: cars.id,
        brand: cars.brand,
        model: cars.model,
        year: cars.year,
        mileage: cars.mileage,
        fuelType: cars.fuelType,
        transmission: cars.transmission,
        pricePerDay: cars.pricePerDay,
        seatingCapacity: cars.seatingCapacity,
        color: cars.color,
        availabilityStatus: cars.availabilityStatus,
        imageUrl: cars.imageUrl,
        videoUrl: cars.videoUrl,
        description: cars.description,
        createdAt: cars.createdAt,
      })
      .from(cars)
      .where(eq(cars.availabilityStatus, "available"))
      .limit(1);

    return car;
  } catch (error) {
    console.error("Error fetching car of the week:", error);
    return null;
  }
}; 