CREATE TABLE "cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"mileage" integer NOT NULL,
	"fuel_type" varchar(20) NOT NULL,
	"transmission" varchar(20) NOT NULL,
	"price_per_day" integer NOT NULL,
	"seating_capacity" integer NOT NULL,
	"color" varchar(50) NOT NULL,
	"availability_status" varchar(30) NOT NULL,
	"image_url" text NOT NULL,
	"video_url" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cars_id_unique" UNIQUE("id")
);
