import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Image
        src="/icons/face-frown.svg"
        alt="face-frown"
        width={22}
        height={22}
        className="w-10 text-gray-400"
      />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Seed Account Data.</p>
      <Link
        href="/admin/cars"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
