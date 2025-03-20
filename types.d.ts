interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt?: Date | null;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

//Car Code

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  transmission: "manual" | "automatic";
  pricePerDay: number;
  seatingCapacity: number;
  color: string;
  availabilityStatus: "available" | "rented" | "under_maintenance";
  location: string;
  features: string[]; // e.g., ["GPS", "Bluetooth", "Air Conditioning"]
  imageUrl: string;
  videoUrl: string;
  description: string;
  createdAt?: Date | null;
  isRented?: boolean;
}

interface CarParams {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  transmission: "manual" | "automatic";
  pricePerDay: number;
  seatingCapacity: number;
  color: string;
  availabilityStatus: "available" | "rented" | "under_maintenance";
  imageUrl: string;
  videoUrl: string;
  description: string;
  createdAt?: Date | null;
  isRented?: boolean;
}
