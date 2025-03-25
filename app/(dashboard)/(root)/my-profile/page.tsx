import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

async function getBorrowedBooksByUser(userId: string) {
  // Optional: Order by borrow date
  return db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      description: books.description,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId))
    .orderBy(borrowRecords.borrowDate);
}

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const latestBooks = (await getBorrowedBooksByUser(userId)) as Book[];
  console.log(latestBooks);
  return (
    <>
      <BookList title="Borrowed cars" books={latestBooks} />
    </>
  );
};
export default Page;
