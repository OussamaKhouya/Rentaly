import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import CustomFilter from "@/components/home/CustomFilter";
import CarCard from "@/components/home/CarCard";
import ShowMore from "@/components/home/ShowMore";
import Contact from "@/components/home/Contact";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/consants";
import { getTranslations } from "next-intl/server";

export default async function Home({ searchParams }: any) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const t = await getTranslations("Home");
  const isDataEmpty = allCars.length < 1 || !allCars || !Array.isArray(allCars);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div
        className={"mt-12 padding-x padding-y" + "max-width"}
        id={"discover"}
      >
        <div className={"home__text-container"}>
          <h1 className={"text-4xl dark:text-white font-extrabold"}>
            {t("Car_Catalogue")}
          </h1>
          <p className="dark:text-gray-300">{t("Explore_the_cars")}</p>
        </div>
        <div className={"home__filters"}>
          <SearchBar />
          <div className={"home__filter-container"}>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => <CarCard key={index} car={car} />)}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className={"home__error-container"}>
            <h2 className={"text-black text-xl font-bold"}>
              Oops! No cars found
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
        <Contact />
      </div>
    </main>
  );
}
