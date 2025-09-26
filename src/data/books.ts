// src/data/books.ts
export type Book = {
  id: number
  title: string
  author: string
  isbn: string
  price: number
  status: "available" | "checked_out"
  publishedAt: string // ISO date
  description?: string
}

let _id = 100

export const books: Book[] = [
  { id: 1, title: "The Pragmatic Programmer", author: "Hunt & Thomas", isbn: "978-0201616224", price: 39.99, status: "available", publishedAt: "1999-10-20T00:00:00Z", description: "Classic software craftsmanship." },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", price: 34.99, status: "available", publishedAt: "2008-08-11T00:00:00Z" },
  { id: 3, title: "Refactoring", author: "Martin Fowler", isbn: "978-0201485677", price: 44.99, status: "checked_out", publishedAt: "1999-07-08T00:00:00Z" },
  { id: 4, title: "You Don't Know JS", author: "Kyle Simpson", isbn: "978-1491904244", price: 24.99, status: "available", publishedAt: "2015-12-27T00:00:00Z" },
  { id: 5, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "978-1449373320", price: 49.99, status: "available", publishedAt: "2017-03-16T00:00:00Z" },
]

export function createBook(partial: Omit<Book, "id">): Book {
  const b: Book = { ...partial, id: ++_id }
  books.unshift(b)
  return b
}

export function updateBook(id: number, patch: Partial<Omit<Book, "id">>) {
  const ix = books.findIndex(b => b.id === id)
  if (ix >= 0) books[ix] = { ...books[ix], ...patch }
}

export function deleteBook(id: number) {
  const ix = books.findIndex(b => b.id === id)
  if (ix >= 0) books.splice(ix, 1)
}

export function getBook(id: number): Book | undefined {
  return books.find(b => b.id === id)
}
