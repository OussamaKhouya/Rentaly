import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateForm from "@/components/admin/forms/create-form";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/cars">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CreateForm />
      </section>
    </>
  );
};
export default Page;
