import * as React from "react"
import { z } from "zod"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery, queryOptions } from "@tanstack/react-query"
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { ProductTable } from "@/features/products/product-table"
import { getProducts } from "@/data/products"

// --- URL search schema ---
const SearchSchema = z.object({
  page: z.number().catch(0),
  pageSize: z.number().catch(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  name: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
})
type Search = z.infer<typeof SearchSchema>

// --- Types that match ProductTable props ---
type Product = {
  id: string
  name: string
  // add other fields your table uses
}

type ProductsPageData = {
  products: Product[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    // include totalCount only if your table expects it; otherwise remove this line
    totalCount?: number
  }
}

// --- Query options (v5: use placeholderData instead of keepPreviousData) ---
function productsQueryOptions(s: Search) {
  return queryOptions({
    queryKey: ["products", s] as const,
    queryFn: async (): Promise<ProductsPageData> =>
      getProducts({
        data: {
          page: s.page,
          pageSize: s.pageSize,
          sortBy: s.sortBy,
          sortOrder: s.sortOrder as "asc" | "desc" | undefined,
          filters: { name: s.name, category: s.category, status: s.status },
        },
      }),
    placeholderData: (prev) => prev, // <-- keeps previous page's data visible while fetching
    staleTime: 5_000,
  })
}

export const Route = createFileRoute("/admin/products")({
  validateSearch: (search) => SearchSchema.parse(search),
  loader: async ({ context, location }) => {
    const s = SearchSchema.parse(location.search)
    await context.queryClient.ensureQueryData(productsQueryOptions(s))
  },
  component: ProductsPage,
})

function ProductsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data } = useQuery(productsQueryOptions(search))

  // A typed fallback so `data ?? fallback` matches ProductTable’s expected `data` shape
  const fallback: ProductsPageData = React.useMemo(
    () => ({
      products: [],
      pagination: {
        page: search.page,
        pageSize: search.pageSize,
        totalPages: 0,
        totalCount: 0, // remove if your table’s type doesn’t include it
      },
    }),
    [search.page, search.pageSize],
  )

  const handlePaginationChange = (page: number, pageSize: number) => {
    navigate({ search: (prev) => ({ ...prev, page, pageSize }), replace: true })
  }

  const handleSortingChange = (sorting: SortingState) => {
    const first = sorting[0]
    navigate({
      search: (prev) => ({
        ...prev,
        sortBy: first?.id,
        sortOrder: first ? (first.desc ? "desc" : "asc") : undefined,
      }),
      replace: true,
    })
  }

  const handleFilterChange = (filters: ColumnFiltersState) => {
    const next: Partial<Search> = {}
    for (const f of filters) {
      if (f.id === "name") next.name = String(f.value ?? "")
      if (f.id === "category") next.category = String(f.value ?? "")
      if (f.id === "status") next.status = String(f.value ?? "")
    }
    navigate({ search: (prev) => ({ ...prev, ...next, page: 0 }), replace: true })
  }

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
      </header>

      <ProductTable
        data={data ?? fallback}
        handlePaginationChange={handlePaginationChange}
        handleSortingChange={handleSortingChange}
        handleFilterChange={handleFilterChange}
      />
    </section>
  )
}
