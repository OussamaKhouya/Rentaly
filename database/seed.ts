import dummyCars from "../dummycars.json";
import dummyBooks from "../dummybooks.json";
import ImageKit from "imagekit";
import { account, books, cars } from "@/database/schema";
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

const seedBooks = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers",
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos",
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

const seedCars = async () => {
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

const seedAccount = async () => {
  console.log("Seeding data Account...");

  try {
    await db.insert(account).values({
      address: "Bouchouk résidence annakhil 2, Salé",
      description: "Location de voitures avec un service d'exception",
      email: "reservation@ylhcar.ma",
      facebook: "https://www.facebook.com/YLHCAR",
      instagram: "https://instagram.com/ylhcarofficiel",
      logo: "/account/YlhCar.64d9d53e70b373df215f_r5i0wQgSoU.png",
      map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.6178887009614!2d-6.785433923760421!3d34.07930831629983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda769aa78982d11%3A0x982c039dce50079d!2sR%C3%A9sidence%20bouchouk%2097%2F98!5e0!3m2!1sen!2sma!4v1742861687372!5m2!1sen!2sma" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      phone: "+212661918917",
      whatsapp: "https://wa.me/212661918917",
    });

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// seedBooks();
// seedCars();
// seedAccount();
