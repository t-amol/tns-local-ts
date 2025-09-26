// src/routes/books.$bookId.edit.tsx
import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookForm } from "@/features/books/BookForm";
import { getBook, updateBook } from "@/data/books";

export const Route = createFileRoute("/books/books/$bookId/edit")({
  component: EditBookPage,
});

function EditBookPage() {
  const navigate = useNavigate();
  // ✅ Use the file-local generated helper – no string key, no `from` needed
  const { bookId } = Route.useParams();

  const id = Number(bookId);
  if (!Number.isFinite(id)) {
    return <div className="alert alert-error">Invalid book id</div>;
  }

  const book = getBook(id);
  if (!book) {
    return <div className="alert alert-error">Book not found</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Book #{book.id}</h2>
      <BookForm
        initial={book}
        onSubmit={(vals) => {
          updateBook(book.id, vals);
          navigate({ to: "/books" });
        }}
        submitLabel="Update"
      />
    </div>
  );
}
