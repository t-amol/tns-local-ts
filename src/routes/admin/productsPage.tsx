import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

// Example A: if your submodule re-exports it
// import { ProductTable } from "@/submodules/product"

// Example B: if the component is at submodules/product/src/ProductTable.tsx
// import { ProductTable } from "@/submodules/product/src/ProductTable"

// Example C: if you copied it into features/products/ProductTable.tsx
import { ProductTable } from "@/features/products/product-table"
import { SortingState, ColumnFiltersState } from "@tanstack/react-table"

export const Route = createFileRoute("/admin/productsPage")({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
      </header>
      <ProductTable data={{
        products: [],
        pagination: {
          page: 0,
          pageSize: 0,
          totalPages: 0
        }
      }} handlePaginationChange={function (page: number, pageSize: number): void {
        throw new Error("Function not implemented.")
      } } handleSortingChange={function (sorting: SortingState): void {
        throw new Error("Function not implemented.")
      } } handleFilterChange={function (filters: ColumnFiltersState): void {
        throw new Error("Function not implemented.")
      } } />
    </section>
  )
}
