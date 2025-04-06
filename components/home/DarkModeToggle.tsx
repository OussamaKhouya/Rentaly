"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DarkModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Ensures correct hydration

    return (
        <button
            className="p-2 transition-colors rounded-full dark:bg-white xl:dark:transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ?
                <Image  src={'/light-mood.svg'} alt={'light mode'} width={24} height={24} />
                :
                <Image src={'/dark-mood.svg'} alt={'dark mode'} width={24} height={24} />
            }
        </button>
    );
}
