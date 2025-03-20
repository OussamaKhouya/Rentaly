import dummyCars from "../dummycars.json";
import ImageKit from "imagekit";
import { books, cars } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string,
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const car of dummyCars) {
      const imageUrl = (await uploadToImageKit(
        car.imageUrl,
        `${car.brand} ${car.model} ${car.year}.jpg`,
        "/cars/covers",
      )) as string;

      const videoUrl = (await uploadToImageKit(
        car.videoUrl,
        `${car.brand} ${car.model} ${car.year}.mp4`,
        "/cars/videos",
      )) as string;

      await db.insert(cars).values({
        ...car,
        imageUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
