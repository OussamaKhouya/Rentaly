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
import {LogOut, Menu, X} from "lucide-react";
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

    // Close sidebar when user clicks outside on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.querySelector('.admin-sidebar');
            const toggleBtn = document.querySelector('.sidebar-toggle');
            
            if (isOpen && 
                sidebar && 
                !sidebar.contains(event.target as Node) && 
                toggleBtn && 
                !toggleBtn.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="fixed top-4 left-4 md:hidden p-2 bg-primary-admin text-white rounded-md z-50 shadow-md sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">{isOpen ? t("Hide_Menu") : t("Show_Menu")}</span>
            </button>

            {/* Sidebar: Hidden on mobile if not toggled open, always visible on md and above */}
            <aside className={`${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 admin-sidebar fixed md:sticky top-0 left-0 flex flex-col justify-between transition-transform duration-300 ease-in-out z-40`}>
                <div className="flex-1 overflow-y-auto">
                    <div className="logo">
                        <h1>{t("Dashboard")}</h1>
                    </div>

                    <div className="mt-6 flex flex-col gap-2 md:gap-3 lg:gap-5">
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
                                        <div className="relative size-4 md:size-5">
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

                <div className="flex flex-col gap-3 pb-4">
                    <Link href="/" target="_blank" className="link bg-primary-admin shadow-sm">
                        <div className="relative size-4 md:size-5">
                            <Image src="/icons/home.svg" fill alt="icon" className="object-contain brightness-0 invert" />
                        </div>
                        <p className="text-white">
                            {t("Visit_Site")}
                        </p>
                    </Link>
                    <div className="flex flex-col gap-2">
                        <div className="w-full bg-white dark:bg-white rounded-full">
                            <LocaleSwitcher/>
                        </div>
                        <form action={handleSignOut}>
                            <Button type="submit" className="w-full text-sm md:text-base py-1.5 md:py-2">
                                {t("Sign_Out")} <LogOut className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </aside>
            
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-30 md:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
