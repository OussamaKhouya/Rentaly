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
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
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
