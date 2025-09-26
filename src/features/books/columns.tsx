// src/features/books/columns.tsx
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import type { Book } from "@/data/books"

export const bookColumns: ColumnDef<Book>[] = [
  { accessorKey: "id", header: "ID", cell: ctx => ctx.getValue() as any },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "author", header: "Author" },
  { accessorKey: "isbn", header: "ISBN" },
  { accessorKey: "price", header: "Price", cell: ({ getValue }) => `₹${Number(getValue() as number).toFixed(2)}` },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "publishedAt",
    header: "Published",
    cell: ({ getValue }) => new Date(String(getValue())).toLocaleDateString(),
  },
]
