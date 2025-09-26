import * as React from "react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table"
import { books, deleteBook, type Book } from "@/data/books"
import { bookColumns } from "@/features/books/columns"

export const Route = createFileRoute("/books/books")({
  component: BooksPage,
})

function matchesQuery(b: Book, q: string) {
  if (!q) return true
  const s = q.toLowerCase().trim()
  return (
    b.title.toLowerCase().includes(s) ||
    b.author.toLowerCase().includes(s) ||
    b.isbn.toLowerCase().includes(s) ||
    (b.description ?? "").toLowerCase().includes(s)
  )
}

function BooksPage() {
  const navigate = useNavigate()
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [debouncedQ, setDebouncedQ] = React.useState(globalFilter)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pageSize, setPageSize] = React.useState(10)

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(globalFilter), 250)
    return () => clearTimeout(t)
  }, [globalFilter])

  const data = React.useMemo(() => books.filter(b => matchesQuery(b, debouncedQ)), [debouncedQ])

  // Extend columns with actions col
  const columns = React.useMemo(() => {
    return [
      ...bookColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: any) => {
          const book = row.original as Book
          return (
            <div className="flex gap-2">
              <button className="btn btn-xs" onClick={() => navigate({ to: "/books/$bookId/edit", params: { bookId: String(book.id) } })}>
                Edit
              </button>
              <button className="btn btn-xs btn-error" onClick={() => { deleteBook(book.id) }}>
                Delete
              </button>
            </div>
          )
        }
      }
    ]
  }, [navigate])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  React.useEffect(() => { table.setPageSize(pageSize) }, [pageSize, table])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          className="input input-bordered"
          placeholder="Search books…"
          value={globalFilter}
          onChange={(e) => { setGlobalFilter(e.target.value); table.setPageIndex(0) }}
        />
        <Link to="/books/new" className="btn btn-primary">New Book</Link>
        <select className="select" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[10, 20, 50].map(sz => <option key={sz} value={sz}>{sz} / page</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(h => (
                  <th key={h.id}
                      onClick={h.column.getToggleSortingHandler?.()}
                      style={{ cursor: h.column.getCanSort() ? "pointer" : "default" }}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                    {h.column.getIsSorted() === "asc" ? " ▲" : ""}
                    {h.column.getIsSorted() === "desc" ? " ▼" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr><td colSpan={table.getAllLeafColumns().length}>No results</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</button>
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button className="btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
      </div>
    </div>
  )
}
