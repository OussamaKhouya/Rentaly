import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(3),
});

export const signInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
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
    .enum(["available", "rented", "under_maintenance", "processing"])
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
  logo2: z.string().optional(),
  description: z.string().trim().min(10).max(1000),
  whatsapp: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  map: z.string().optional(),
});
