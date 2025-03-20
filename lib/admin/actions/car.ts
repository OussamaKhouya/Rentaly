"use server";

import { cars } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createCar = async (params: CarParams) => {
  try {
    const newCar = await db.insert(cars).values(params).returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCar[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const deleteCar = async (id: string) => {
  try {
    const deletedCar = await db.delete(cars).where(eq(cars.id, id)).returning();

    if (!deletedCar.length) {
      return {
        success: false,
        message: "Car not found",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(deletedCar[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while deleting the car",
    };
  }
};
