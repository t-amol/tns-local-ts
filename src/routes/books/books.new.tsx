import * as React from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { BookForm } from "@/features/books/BookForm"
import { createBook } from "@/data/books"

export const Route = createFileRoute("/books/books/new")({
  component: NewBookPage,
})

function NewBookPage() {
  const navigate = useNavigate()
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create Book</h2>
      <BookForm
        onSubmit={(vals) => {
          createBook(vals)
          navigate({ to: "/books" })
        }}
        submitLabel="Create"
      />
    </div>
  )
}
