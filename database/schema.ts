import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);


export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});



// Car
export const FUEL_TYPE_ENUM = pgEnum("fuel_type", [
  "petrol",
  "diesel",
  "electric",
  "hybrid",
]);

export const TRANSISSION_ENUM = pgEnum("transmission", ["manual", "automatic"]);
export const AVAILABILITY_STATUS_ENUM = pgEnum("availability_status", [
  "available",
  "rented",
  "under_maintenance",
  "processing"
]);

export const cars = pgTable("cars", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  brand: varchar("brand", { length: 255 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  order: integer("order").default(0).notNull(),
  fuelType: FUEL_TYPE_ENUM("fuel_type").default("petrol").notNull(), // "petrol", "diesel", etc.
  transmission: TRANSISSION_ENUM("transmission").default("manual").notNull(), // "manual", "automatic"
  pricePerDay: integer("price_per_day").notNull(),
  seatingCapacity: integer("seating_capacity").notNull(),
  color: varchar("color", { length: 50 }),
  availabilityStatus: AVAILABILITY_STATUS_ENUM("availability_status")
    .default("available")
    .notNull(), // "available", "rented", etc.
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  description: text("description"),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const account = pgTable("accounts", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  logo: varchar("logo", { length: 255 }).notNull(),
  logo2: varchar("logo2", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 255 }).notNull(),
  facebook: varchar("facebook", { length: 255 }).notNull(),
  instagram: varchar("instagram", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  map: text("map").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
