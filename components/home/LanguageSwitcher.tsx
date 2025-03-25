"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex gap-2">
            <Link href={pathname} locale="fr">
                <button className="px-3 py-1 bg-gray-200 rounded">🇫🇷 Français</button>
            </Link>
            <Link href={pathname} locale="en">
                <button className="px-3 py-1 bg-gray-200 rounded">🇺🇸 English</button>
            </Link>

        </div>
    );
};

export default LanguageSwitcher;
