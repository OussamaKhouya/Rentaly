import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CarForm from "@/components/admin/forms/CarForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/cars">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CarForm />
      </section>
    </>
  );
};
export default Page;
