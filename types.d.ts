export interface Book {
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
  order: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  transmission: "manual" | "automatic";
  pricePerDay: number;
  seatingCapacity: number;
  color: string;
  availabilityStatus: "available" | "rented" | "under_maintenance" | "processing";
  imageUrl: string;
  videoUrl: string;
  description: string;
  createdAt?: Date | null;
  isRented?: boolean;
}

export interface CarParams {
  id?: string;
  brand: string;
  model: string;
  year: number;
  order: number;
  fuelType?: "petrol" | "diesel" | "electric" | "hybrid";
  transmission?: "manual" | "automatic";
  pricePerDay: number;
  seatingCapacity: number;
  color: string;
  availabilityStatus?: "available" | "rented" | "under_maintenance" | "processing";
  imageUrl: string | null;
  videoUrl?: string | null;
  description: string | null;
  createdAt?: Date | null;
  isRented?: boolean;
}

interface AccountParams {
  logo?: string;
  logo2?: string;
  description?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  phone?: string;
  address?: string;
  map?: string;
}
