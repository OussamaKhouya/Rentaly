import { ReactNode } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {


  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <h1 className="text-3xl font-semibold text-white">Authentication</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
