import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});

// Car

export const carSchema = z.object({
  id: z.string().uuid().optional(),
  brand: z.string().trim().min(2).max(50),
  model: z.string().trim().min(1).max(50),
  year: z.coerce.number().int().min(1886).max(new Date().getFullYear()), // Ensuring valid car production years
  order: z.coerce.number().int().nonnegative(),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]).optional(),
  transmission: z.enum(["manual", "automatic"]).optional(),
  pricePerDay: z.coerce.number().positive(),
  seatingCapacity: z.coerce.number().int().positive().lte(9), // Limiting to common passenger vehicle capacities
  color: z.string().trim().min(3).max(20),
  availabilityStatus: z
    .enum(["available", "rented", "under_maintenance"])
    .optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  description: z.string().trim().min(10).max(1000),
  createdAt: z.coerce.date().nullable().optional(),
  isRented: z.boolean().optional(),
});

export const accountSchema = z.object({
  id: z.string().uuid().optional(),
  logo: z.string().optional(),
  description: z.string().trim().min(10).max(1000),
  whatsapp: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  map: z.string().optional(),
});
