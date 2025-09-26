// src/features/books/BookForm.tsx
import * as React from "react"
import type { Book } from "@/data/books"

type BookFormProps = {
  initial?: Partial<Book>
  onSubmit: (values: Omit<Book, "id">) => void
  submitLabel?: string
}

export function BookForm({ initial, onSubmit, submitLabel = "Save" }: BookFormProps) {
  const [values, setValues] = React.useState<Omit<Book, "id">>({
    title: initial?.title ?? "",
    author: initial?.author ?? "",
    isbn: initial?.isbn ?? "",
    price: initial?.price ?? 0,
    status: (initial?.status as Book["status"]) ?? "available",
    publishedAt: initial?.publishedAt ?? new Date().toISOString(),
    description: initial?.description ?? "",
  })

  function bind<K extends keyof Omit<Book,"id">>(key: K) {
    return {
      value: values[key] as any,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setValues(v => ({ ...v, [key]: key === "price" ? Number(e.target.value) : e.target.value })),
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => { e.preventDefault(); onSubmit(values) }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="form-control">
          <span className="label-text">Title</span>
          <input className="input input-bordered" required {...bind("title")} />
        </label>
        <label className="form-control">
          <span className="label-text">Author</span>
          <input className="input input-bordered" required {...bind("author")} />
        </label>

        <label className="form-control">
          <span className="label-text">ISBN</span>
          <input className="input input-bordered" required {...bind("isbn")} />
        </label>
        <label className="form-control">
          <span className="label-text">Price</span>
          <input className="input input-bordered" type="number" min={0} step="0.01" required {...bind("price")} />
        </label>

        <label className="form-control">
          <span className="label-text">Status</span>
          <select className="select select-bordered" {...bind("status")}>
            <option value="available">available</option>
            <option value="checked_out">checked_out</option>
          </select>
        </label>
        <label className="form-control">
          <span className="label-text">Published At</span>
          <input className="input input-bordered" type="date"
            {...{
              value: (values.publishedAt ?? "").slice(0,10),
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setValues(v => ({ ...v, publishedAt: new Date(e.target.value).toISOString() })),
            }}
          />
        </label>
      </div>

      <label className="form-control">
        <span className="label-text">Description</span>
        <textarea className="textarea textarea-bordered" rows={4} {...bind("description")} />
      </label>

      <div className="flex gap-2">
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  )
}
