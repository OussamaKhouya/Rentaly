import { CarProps, FilterProps } from "../types/index";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit = 5 } = filters;

  let conditions = [];

  if (manufacturer) {
    conditions.push(`make%3D%22${encodeURIComponent(manufacturer)}%22`);
  }

  if (model) {
    conditions.push(`model%3D%22${encodeURIComponent(model)}%22`);
  }

  if (year) {
    conditions.push(`year%20%3D%20date%27${encodeURIComponent(year)}%27`);
  }

  if (fuel) {
    conditions.push(`fueltype1%3D%22${encodeURIComponent(fuel)}%22`);
  }

  // Join conditions with 'AND'
  let whereClause =
    conditions.length > 0 ? `where=${conditions.join("%20AND%20")}` : "";

  const baseUrl =
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records";

  const url = `${baseUrl}?${whereClause}&limit=${limit}`;
  //https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?where=make%3D%22Ford%22%20and%20model%3D%22Escape%20FWD%22%20AND%20year%20%3D%20date%272023%27&limit=5
  const response = await fetch(url);
  console.log(url);
  const result = await response.json();
  return result["results"];
}
export const calculateCarRent = (city08: number, year: string) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city08 * mileageFactor;
  const ageRate = (new Date().getFullYear() - Number(year)) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
export const getDriveTypeAbbreviation = (drive: string) => {
  // Get the first letter of the first word (before the hyphen) and add "WD"
  const firstLetter = drive.split("-")[0][0]; // Get the first character of the first word
  return firstLetter + "WD";
};
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${Number(year)}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  if (angle !== undefined) {
    url.searchParams.append("angle", `${angle}`);
  }

  return `${url}`;
};
export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
