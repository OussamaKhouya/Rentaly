"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";
import {adminSideBarLinks} from "@/constants";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {Session} from "next-auth";
import {handleSignOut, isAdmin} from "@/lib/admin/actions/car";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import {useTranslations} from "next-intl";
import LocaleSwitcher from "@/components/admin/LocaleSwitcher";
import {auth} from "@/auth";

const Sidebar = ({session}: { session: Session }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const t = useTranslations("Admin");

    useEffect(() => {
        const checkAdminStatus = async () => {
            const adminStatus = await isAdmin(session?.user?.id);
            setIsUserAdmin(adminStatus === true);
        };
         checkAdminStatus();
    }, [session?.user?.id]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="fixed top-4 left-1 opacity-70 md:hidden p-2 bg-primary-admin text-white rounded z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <span className="sr-only">Hide Menu</span>
                ) : (
                    <span className="sr-only">Show Menu</span>
                )}
                {isOpen ? "×" : "≡"}
            </button>

            {/* Sidebar: Hidden on mobile if not toggled open, always visible on md and above */}
            <div className={`${isOpen ? "flex" : "hidden"} md:flex admin-sidebar flex-col justify-between`}>
                <div className="flex-1">
                    <div className="logo">
                        <h1 className="text-2xl font-bold text-dark-400">{t("Dashboard")}</h1>
                    </div>

                    <div className="mt-10 flex flex-col gap-5">
                        {adminSideBarLinks.filter(link => {
                            // Show all links for admin users
                            // Show only links with showUser=true for regular users
                            return isUserAdmin ? true : link.showUser;
                        }).map((link) => {
                            const isSelected =
                                (link.route !== "/admin" &&
                                    pathname.includes(link.route) &&
                                    link.route.length > 1) ||
                                pathname === link.route;

                            return (
                                <Link href={link.route} key={link.route}>
                                    <div
                                        className={cn(
                                            "link",
                                            isSelected && "bg-primary-admin shadow-sm",
                                        )}
                                    >
                                        <div className="relative size-5">
                                            <Image
                                                src={link.img}
                                                alt="icon"
                                                fill
                                                className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                                            />
                                        </div>

                                        <p className={cn(isSelected ? "text-white" : "text-dark")}>
                                            {t(link.text)}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-4 pb-4">

                    <div className="flex flex-col gap-2">
                        <div className="w-full bg-white dark:bg-white rounded-full">
                            <LocaleSwitcher/>
                        </div>
                        <form action={handleSignOut}>
                            <Button type="submit" className="w-full">

                                {t("Sign_Out")} <LogOut className="ml-2"/>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
