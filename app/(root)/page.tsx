import Hero from "@/components/home/Hero";
import CarCard from "@/components/home/CarCard";
import Contact from "@/components/home/Contact";
import {getTranslations} from "next-intl/server";
import {fetchAccount, fetchAllCars} from "@/lib/admin/actions/car";
import {getCarOfTheWeek} from "@/lib/actions/car";
import {CarParams} from "@/types";

export default async function Home({searchParams}: any) {
    const allCars = await fetchAllCars();

    const account = await fetchAccount();
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

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars?.map((car, index) => <CarCard key={index} car={car}/>)}
                        </div>
                    </section>
                ) : (
                    <div className={"home__error-container"}>
                        <h2 className={"text-black text-xl font-bold"}>
                            Oops! No cars found
                        </h2>
                    </div>
                )}
                <Contact account={account}/>
            </div>
        </main>
    );
}
