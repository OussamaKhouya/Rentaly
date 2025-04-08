import Hero from "@/components/home/Hero";
import CarCard from "@/components/home/CarCard";
import Contact from "@/components/home/Contact";
import {getTranslations} from "next-intl/server";
import {fetchAccount, fetchAllCarsByOrder} from "@/lib/admin/actions/car";

export default async function Home() {
    const allCars = await fetchAllCarsByOrder();

    const account = await fetchAccount();
    const t = await getTranslations("Home");
    const isDataEmpty = allCars.length < 1 || !allCars || !Array.isArray(allCars);

    return (
        <main className="overflow-hidden">
            <Hero account={account}/>
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
                            {allCars?.map((car, index) => <CarCard key={index} car={car} account={account}/>)}
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
