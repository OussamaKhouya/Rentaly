import React, {MouseEventHandler} from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}
export interface SearchManufacturerProps {
    manufacturer: string;
    setManuFacturer:(manufacturer:string)=>void;
}
export interface CarProps {
    make: string;
    model: string;
    year: string;
    id: number;
    trany: string;
    fueltype1: string;
    drive: string;
    city08: number;
}
export interface CarCardProps {
    make: string;
    model: string;
    year: string;
    id: number;
    trany: string;
    fueltype1: string;
    drive: string;
    city08: number;
}
export interface FilterProps {
    manufacturer: string,
    model:string,
    year : string,
    fuel:string,
    limit:number,
}
export interface OptionProps {
    title: string;
    value: string;
}
export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}
export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}
export interface AccountParams {
  logo?: string;
  description?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
  phone?: string;
  address?: string;
  map?: string;
}

export type CarParams = {
  id?: string;
  brand: string;
  model: string;
  year: number;
  order: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  transmission: "manual" | "automatic";
  pricePerDay: number;
  seatingCapacity: number;
  color: string | null;
  availabilityStatus: "available" | "rented" | "under_maintenance";
  imageUrl?: string | null;
  videoUrl?: string | null;
  description?: string | null;
  featured?: boolean;
  createdAt?: Date | null;
};

export type Car = CarParams & {
  location: string;
  features: string[];
};