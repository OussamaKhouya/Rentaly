"use server";

import {account, cars} from "@/database/schema";
import {db} from "@/database/drizzle";
import {desc, eq,asc} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {signOut} from "@/auth";
import {AccountParams, Car, CarParams} from "@/types";

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

export const updateCar = async (params: CarParams, id: string) => {
    try {
        await db.update(cars).set(params).where(eq(cars.id, id));

        return {
            success: true,
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "An error occurred while creating the book",
        };
    }
};

export const fetchCarById = async (id: string): Promise<CarParams> => {
    try {
        const [newCar] = await db
            .select()
            .from(cars)
            .where(eq(cars.id, id))
            .limit(1);

        return newCar;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch car.");
    }
};

export const fetchAllCars = async (): Promise<Car[]> => {
    try {
        return (await db
            .select()
            .from(cars)
            .orderBy(desc(cars.createdAt))) as Car[];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch car.");
    }
};

export const fetchAllCarsByOrder = async (): Promise<Car[]> => {
    try {
        return (await db
            .select()
            .from(cars)
            .orderBy(asc(cars.order))) as Car[];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch car.");
    }
};

export const deleteCar = async (id: string) => {
    await db.delete(cars).where(eq(cars.id, id));
    revalidatePath("/admin/cars");
};

export const refreshCars = async () => {
    revalidatePath("/admin/cars");
};

// Account
export const fetchAccount = async (): Promise<AccountParams> => {
    try {
        const [userAccount] = await db.select().from(account).limit(1);
        return userAccount;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch car.");
    }
};

export const updateAccount = async (params: AccountParams) => {
    try {
        await db.update(account).set(params);

        return {
            success: true,
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "An error occurred while creating the book",
        };
    }
};

export async function handleSignOut() {
    await signOut();
}

export const fetchFeaturedCar = async (): Promise<CarParams | null> => {
    try {
        const [featuredCar] = await db
            .select()
            .from(cars)
            .where(eq(cars.featured, true))
            .limit(1);

        return featuredCar || null;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch featured car.");
    }
};
